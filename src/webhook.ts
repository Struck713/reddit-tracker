import type { Comment, Post, User } from "./reddit";

export const postToWebhook = (user: User, post: Post) => {
    const message = {
        content: null,
        embeds: [
            {
                title: post.title.substring(0, 255),
                description: post.selftext,
                url: `https://reddit.com${post.permalink}`,
                color: 14177041,
                author: {
                    name: `${user.name} posted:`,
                    icon_url: user.icon_img
                },
                footer: {
                    text: post.subreddit_name_prefixed
                },
                timestamp: new Date(post.created * 1000).toISOString(),
                image: {
                    url: post.thumbnail != "self" ? post.url : undefined 
                }
            }
        ],
        username: "Reddit Tracker",
        avatar_url: "https://i.imgur.com/EyS0N96.png",
        attachments: []
    }

    return fetch(process.env.WEBHOOK_URL!, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .catch(e => null);
}

export const commentToWebhook = (user: User, comment: Comment) => {
    const message = {
        content: null,
        embeds: [
            {
                title: comment.link_title.substring(0, 255),
                description: comment.body,
                url: `https://reddit.com${comment.permalink}`,
                color: 14177041,
                author: {
                    name: `${user.name} replied to ${comment.link_author}:`,
                    icon_url: user.icon_img
                },
                footer: {
                    text: comment.subreddit_name_prefixed
                },
                timestamp: new Date(comment.created * 1000).toISOString(),
            }
        ],
        username: "Reddit Tracker",
        avatar_url: "https://i.imgur.com/EyS0N96.png",
        attachments: []
    }

    return fetch(process.env.WEBHOOK_URL!, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .catch(e => null);
}