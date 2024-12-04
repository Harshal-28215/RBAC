This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run npm intall in both main file and /backendfile
Then, run the development server:

For Front End
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

For Back End
```bash
npm run start
```

Add mongodb connection string to MONGO_URL in .env file

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

This is role based access control blog app which has 3 role admin,moderator, and user.
Admin can edit or delete any blog
Moderator can edit any blog but cant delete it
User can edit and delete blog of it's own only
