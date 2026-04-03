#!/bin/sh
set -e

echo "Starting application setup..."

# Wait for the database to be ready
MAX_RETRIES=30
RETRY_COUNT=0
until pg_isready -h "${DB_HOST:-postgres}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-postgres}" -d "${DB_DATABASE:-galaxytradelda}"; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
        echo "ERROR: Could not connect to database after ${MAX_RETRIES} attempts. Exiting."
        exit 1
    fi
    echo "Waiting for database... (attempt ${RETRY_COUNT}/${MAX_RETRIES})"
    sleep 2
done

echo "Database is ready."

# Run migrations
php artisan migrate --force

# Create storage symlink
php artisan storage:link --force 2>/dev/null || true

# Cache configuration, routes, and views for production
if [ "$APP_ENV" = "production" ]; then
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

echo "Application is ready."

exec "$@"
