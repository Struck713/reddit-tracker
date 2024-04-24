# reddit-tracker

A simple TypeScript app that can track a Reddit user's comments and posts and push them to a Discord webhook.

This project uses Bun, so to install you can run:
```Bash
bun install
```

Then you can configure the .env file:
```Properties
REDDIT_USER=The Reddit user to track
WEBHOOK_URL=The Discord webhook URL, or any webhook that access JSON and post requests
```

Then:
```Bash
bun run src/index.ts
```

It's that simple, should pretty much work out of the box.