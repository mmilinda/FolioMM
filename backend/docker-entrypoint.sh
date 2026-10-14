#!/bin/sh
set -e

# Run storage link if not already linked
php artisan storage:link || true

# Run migrations if configured
if [ "$RUN_MIGRATIONS" = "true" ]; then
    echo "Running database migrations..."
    php artisan migrate --force || true
fi

# Run seed if configured
if [ "$RUN_SEED" = "true" ]; then
    echo "Running database seeder..."
    php artisan db:seed --force || true
fi

# Cache config & routes for performance
php artisan config:cache || true
php artisan route:cache || true

PORT=${PORT:-8080}
echo "Starting Laravel server on port $PORT..."
exec php artisan serve --host=0.0.0.0 --port=$PORT
