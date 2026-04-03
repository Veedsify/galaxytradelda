#!/bin/sh
set -e

echo "Starting application setup..."

# Wait for the database to be ready
until pg_isready -h "${DB_HOST:-postgres}" -p "${DB_PORT:-5432}" -U "${DB_USERNAME:-postgres}" -q 2>/dev/null; do
    echo "Waiting for database..."
    sleep 2
done

echo "Database is ready."

# Run migrations
php artisan migrate --force

# Create storage symlink
php artisan storage:link --force 2>/dev/null || true

php artisan db:seed

# Cache configuration, routes, and views for production
if [ "$APP_ENV" = "production" ]; then
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

echo "Application is ready."

exec "$@"
