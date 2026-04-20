# Backend (travel-planner API)

REST API for trips, itinerary days, and activities. Built with **Express 5**, **TypeScript**, **Prisma 7**, and **PostgreSQL** (via the [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/database-drivers#pg) driver adapter).

## Prerequisites

- Node.js and pnpm (install dependencies from the **repository root** with `pnpm install`).
- PostgreSQL 15+ locally or via Docker. The repo root includes `docker-compose.yml` with:

  | Variable        | Value            |
  |-----------------|------------------|
  | User            | `travel_user`    |
  | Password        | `travel_password`|
  | Database        | `travel_planner` |
  | Port            | `5432`           |

## Environment

Create `apps/backend/.env` (or export in your shell) with:

```bash
DATABASE_URL="postgresql://travel_user:travel_password@localhost:5432/travel_planner"
```

Adjust host, port, user, password, and database name if your setup differs.

> **Note:** `src/db/prisma.ts` logs `DATABASE_URL` on startup. Remove or guard that log if you deploy anywhere sensitive.

## Database

From `apps/backend`:

| Script            | Command                          | Purpose                    |
|-------------------|----------------------------------|----------------------------|
| `pnpm db:start`   | Compose against repo-root file   | Starts Postgres            |
| `pnpm db:stop`    | Compose against repo-root file   | Stops Postgres             |
| `pnpm db:migrate` | `pnpm dlx prisma migrate dev`    | Applies migrations in dev  |

`db:start` / `db:stop` use the `docker-compose.yml` at the repository root so they work when you run pnpm from `apps/backend`.

Example:

```bash
cd apps/backend
pnpm db:start
pnpm db:migrate
```

`postinstall` runs `prisma generate` so the client is available after `pnpm install`.

## Run the server

From `apps/backend`:

```bash
pnpm dev
```

Default URL: **http://localhost:3000** (see `src/server.ts`).

Other scripts:

- `pnpm build` — compile TypeScript to `dist/`
- `pnpm typecheck` — `tsc --noEmit`

## HTTP API

JSON request bodies where noted. Errors are generally `{ "error": "message" }` with an appropriate status code.

### Users — `/users`

| Method | Path            | Description |
|--------|-----------------|-------------|
| `POST` | `/users`        | Create user. Body: `{ "email": string }` |
| `GET`  | `/users/:userId` | Get user by UUID |

### Trips — `/trips`

| Method | Path     | Description |
|--------|----------|-------------|
| `GET`  | `/trips` | List all trips |
| `POST` | `/trips` | Create trip. Body: `{ "name": string, "userId": string, "startDate"?: ..., "endDate"?: ... }` |

### Days

| Method | Path                    | Description |
|--------|-------------------------|-------------|
| `POST` | `/trips/:tripId/days`   | Add a day to a trip. Body: `{ "title"?: string }`. `index` is assigned automatically per trip |

### Activities

| Method   | Path                          | Description |
|----------|-------------------------------|-------------|
| `GET`    | `/days/:dayId/activities`     | List activities for a day |
| `POST`   | `/days/:dayId/activities`     | Create activity. Body: `{ "title": string, "description"?: string }`. `position` is assigned automatically |
| `PATCH`  | `/activities/:activityId`   | Partial update (title, description, type, scheduling, times, location fields, etc.) |
| `DELETE` | `/activities/:activityId`   | Delete activity (`204` on success) |

## Architecture

```
src/
  server.ts              # Express app, JSON middleware, routes, error handler
  routes/                # HTTP handlers (thin)
  services/              # Business logic + Prisma calls
  db/prisma.ts           # PrismaClient + pg adapter
  middleware/            # asyncHandler, errorHandler
  errors/AppError.ts     # Operational errors with HTTP status
  utils/prismaErrorHandler.ts  # Maps some Prisma errors to AppError
prisma/
  schema.prisma          # User → Trip → Day → Activity
  migrations/
```

- **Routes** validate basic input and call **services** for trips, days, and activities. **User** routes use `prisma` directly.
- **`asyncHandler`** forwards rejected promises to **`errorHandler`**, which handles `AppError` and a subset of Prisma client errors.

## Data model (short)

- **User** — `email` (unique); owns many **Trip**s.
- **Trip** — belongs to a user; optional `startDate` / `endDate`; `status` enum (`DRAFT`, `IN_PROGRESS`, `COMPLETED`).
- **Day** — belongs to a trip; **`index`** is the logical day order within the trip (`@@unique([tripId, index])`).
- **Activity** — belongs to a day; **`position`** orders items within that day; optional scheduling and location fields; `ActivityType` and `SchedulingType` enums.

See `prisma/schema.prisma` for the full schema.
