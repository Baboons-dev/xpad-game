This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# env

BOT_USERNAME=pepe_mp3_bot

BOT_TOKEN=

SECRET=

SECRET_KEY=

NEXTAUTH_SECRET=

<!-- DATABASE_URL=postgresql://<db_username>:<db_passowrd>@<ip_address>:5432/<db_name> -->

DATABASE_URL=postgresql://postgres:123456@localhost:5432/frog-dev

ADMIN_SECRET_KEY=

NEXTAUTH_URL=http://localhost:3000

BASE_URL=http://localhost:3000

# Note

Make sure the SECRET_KEY and SECRET is the same as in bot.js file in root folder

# Running the project dev mode

NPM
`npm install && npm run dev`

Yarn
`yarn && yarn dev`

# DB schema

when changes are made to prisma schema
you need to run postinstall script in package.json
and to migrate schema `npx prisma db push` also available in package script `yarn prismadb`

to clear db `yarn prismadbForce` <<never run this on prod>>

for db dashboard
`yarn studio`

# HACK to authentication locally

in TelegramProvider.tsx

uncomment

```
// const statUser = {
  //   id: 6365928461,
  //   first_name: 'waqas',
// };
```

and in authOptions.ts file

`const decryptedId: any = await decrypt(credentials.tgId ?? '');`

change to

`const decryptedId: any = credentials.telegramId;`

will let you authenticate locally

# bot.js

The file in the root directory stays the tg bot up and running for debug locally you can create your own bot with BotFather in telegram and for production this file need to run in cleaver process monitors
`node bot.js`

# Providers

the AppProvider file include all the providers like

TelegramProvider > make sure that the telegram scripts are added and user is extracted from the telegram app

ReferralProvider > use for referral code

SessionProvider > NextJs auth provider gives the loggedIn user with

`const {data, update} = useSession();`

`const user = data.user //gives user`
