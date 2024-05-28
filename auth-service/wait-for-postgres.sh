#!/bin/sh

until pg_isready -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}"; do
  echo "Waiting for PostgreSQL to be available..."
  sleep 2
done

echo "PostgreSQL is available, starting the application..."
exec "$@"
