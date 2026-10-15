# Bloglist backend (Postgres + Sequelize)

Full Stack Open part 13 exercises.

## Run locally

    docker compose up -d     # Postgres in Docker, port 5432
    npm install
    npm run dev              # app on http://localhost:3001

`.env`:

    DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/postgres

psql console:

    docker compose exec db psql -U postgres postgres

or directly

    psql postgres://postgres:mysecretpassword@localhost:5432/postgres
