import { Listings, getUserData, getUserListing, type Comment, type Post } from "./reddit";
import { commentToWebhook, postToWebhook } from "./webhook";

interface State {
    last_post: string;
    last_comment: string;
}

(async () => {

    const file = await Bun.file("state.lock");
    const user = await getUserData();
    if (!user) {
        console.log("Failed to get user data.");
        return;
    }

    console.log(`Loaded data for ${user.name} -> ${user.icon_img}.`);

    setInterval(async () => {
        const state: State = await file.json().catch(_ => null);

        if (!state) {
            console.log("Failed to load 'state.lock'");
            return;
        }

        const posts = await getUserListing<Post>(Listings.POSTS, state.last_post);
        if (!posts) {
            console.log("Failed to get recent posts.");
            return;
        }

        for (const post of posts) {
            await postToWebhook(user, post);
            console.log(`[${post.name}] Logged new post: ${post.permalink}`);
        }

        const comments = await getUserListing<Comment>(Listings.COMMENTS, state.last_comment);
        if (!comments) {
            console.log("Failed to get recent comments.");
            return;
        }

        for (const comment of comments) {
            await commentToWebhook(user, comment);
            console.log(`[${comment.name}] Logged new comment: ${comment.permalink}`);
        }

        state.last_comment = comments.length > 0 ? comments[0].name : state.last_comment;
        state.last_post = posts.length > 0 ? posts[0].name : state.last_post;

        Bun.write(file, JSON.stringify(state));
    }, 30 * 1000);


})();