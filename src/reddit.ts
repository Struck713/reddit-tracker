const REDDIT_URL = "https://www.reddit.com/user";

export enum Listings {
    POSTS = "submitted",
    COMMENTS = "comments"
}

export interface Post {
    approved_at_utc: null,
    subreddit: string,
    title: string,
    selftext: string,
    subreddit_name_prefixed: string,
    name: string,
    thumbnail: string,
    edited: boolean,
    post_hint: string,
    subreddit_type: string,
    created: number,
    link_flair_type: string,
    wls: number,
    domain: string,
    url_overridden_by_dest: string,
    subreddit_id: string,
    id: string,
    author: string,
    permalink: string,
    url: string,
}

export interface Comment {
    subreddit_id: string,
    link_title: string,
    subreddit: string,
    link_author: string,
    id: string,
    author: string,
    parent_id: string,
    author_fullname: string,
    body: string,
    link_id: string,
    permalink: string,
    link_permalink: string,
    name: string,
    subreddit_name_prefixed: string,
    created: number,
    link_url: string
}

export interface User {
    icon_img: string,
    name: string
}

export const getUserData = () =>
    fetch(`${REDDIT_URL}/${process.env.REDDIT_USER}/about.json`, {
        method: "GET",
        headers: {
            "User-Agent": "nodejs:dev.nstruck.web:v1.0.0 (by /u/Struck713)"
        }
    }).then(res => res.json())
        .then(res => res.data as User)
        .catch(_ => null);

export const getUserListing = <T>(listing: Listings, before: string) =>
    fetch(`${REDDIT_URL}/${process.env.REDDIT_USER}/${listing}.json?${new URLSearchParams({ before }).toString()}`, {
        method: "GET",
        headers: {
            "User-Agent": "nodejs:dev.nstruck.web:v1.0.0 (by /u/Struck713)"
        }
    }).then(res => res.json())
        .then(res => Array.from(res.data.children))
        .then(res => res.map((item: any) => item.data) as T[])
        .catch(_ => null);