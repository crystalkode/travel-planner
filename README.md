# Travel planner

Monorepo for a travel planning application. The active application today is the **backend** API under `apps/backend`.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) 10.x (see `packageManager` in the root `package.json`)
- [Docker](https://www.docker.com/) (for local PostgreSQL)

## Quick start

1. **Install dependencies** (from the repository root):

   ```bash
   pnpm install
   ```

2. **Start PostgreSQL** (root `docker-compose.yml`):

   ```bash
   docker compose up -d
   ```

3. **Configure and run the backend** — see [apps/backend/README.md](apps/backend/README.md) for `DATABASE_URL`, migrations, scripts, and HTTP API documentation.

## Repository layout

| Path            | Description                                      |
|-----------------|--------------------------------------------------|
| `apps/backend/` | Express + Prisma REST API                        |
| `packages/`     | Reserved for shared packages (empty for now)    |

## Root scripts

- `pnpm build` — runs `pnpm -r build` across workspace packages
- `pnpm tsc` — TypeScript at the root (if configured for shared tooling)

For day-to-day backend work, use the scripts in `apps/backend/package.json`.
