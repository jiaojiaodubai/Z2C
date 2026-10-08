# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Zotero Schema

The bundled schema is refreshed from Zotero's official schema API before production builds and static generation. To update it manually, run:

```bash
pnpm sync:schema
```

This provides an on-demand way to refresh the checked-in snapshot.

GitHub Actions also checks for schema changes weekly on Monday at 00:00 UTC. When the schema changes, it commits the updated snapshot to the default branch. If Netlify is connected to this repository with automatic deploys enabled, that commit triggers a site rebuild; unchanged schemas do not trigger a deployment.

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
