# Octofit Tracker frontend

The React 19 presentation tier is built with Vite, React Router, and Bootstrap. It displays activities, leaderboard standings, teams, members, and workout suggestions from the API tier.

## API configuration

The frontend calls the API on port `8000`. In GitHub Codespaces, define `VITE_CODESPACE_NAME` in a local environment file such as `.env.local` before starting Vite:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The value is the Codespace name (without a port or domain). The frontend uses it to build `https://<codespace-name>-8000.app.github.dev`. Vite reads `.env.local` at startup, so restart the dev server after changing it.

`VITE_CODESPACE_NAME` is required to connect from a Codespace browser to the remote API. When it is unset (for local development), the frontend safely uses `http://localhost:8000`.

## Development

Run `npm run dev` from this directory to start the Vite development server. Use `npm run build` to create a production build and `npm run lint` to run Oxlint.
