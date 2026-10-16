<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Neon PgBouncer uses ATTR_EMULATE_PREPARES which sends booleans as 0/1 integers.
     * PostgreSQL strictly rejects integers for boolean columns unless they are smallint.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            // Projects
            try {
                DB::statement('ALTER TABLE projects ALTER COLUMN featured TYPE smallint USING (CASE WHEN featured::text IN (\'true\', \'t\', \'1\') THEN 1 ELSE 0 END)');
                DB::statement('ALTER TABLE projects ALTER COLUMN featured SET DEFAULT 0');
            } catch (\Throwable $e) {}

            try {
                DB::statement('ALTER TABLE projects ALTER COLUMN hidden TYPE smallint USING (CASE WHEN hidden::text IN (\'true\', \'t\', \'1\') THEN 1 ELSE 0 END)');
                DB::statement('ALTER TABLE projects ALTER COLUMN hidden SET DEFAULT 0');
            } catch (\Throwable $e) {}

            try {
                DB::statement('ALTER TABLE projects ALTER COLUMN is_private TYPE smallint USING (CASE WHEN is_private::text IN (\'true\', \'t\', \'1\') THEN 1 ELSE 0 END)');
                DB::statement('ALTER TABLE projects ALTER COLUMN is_private SET DEFAULT 0');
            } catch (\Throwable $e) {}

            // Services
            try {
                DB::statement('ALTER TABLE services ALTER COLUMN hidden TYPE smallint USING (CASE WHEN hidden::text IN (\'true\', \'t\', \'1\') THEN 1 ELSE 0 END)');
                DB::statement('ALTER TABLE services ALTER COLUMN hidden SET DEFAULT 0');
            } catch (\Throwable $e) {}

            // Articles
            try {
                DB::statement('ALTER TABLE articles ALTER COLUMN published TYPE smallint USING (CASE WHEN published::text IN (\'true\', \'t\', \'1\') THEN 1 ELSE 0 END)');
                DB::statement('ALTER TABLE articles ALTER COLUMN published SET DEFAULT 1');
            } catch (\Throwable $e) {}

            // Messages
            try {
                DB::statement('ALTER TABLE messages ALTER COLUMN read TYPE smallint USING (CASE WHEN read::text IN (\'true\', \'t\', \'1\') THEN 1 ELSE 0 END)');
                DB::statement('ALTER TABLE messages ALTER COLUMN read SET DEFAULT 0');
            } catch (\Throwable $e) {}
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            try {
                DB::statement('ALTER TABLE projects ALTER COLUMN featured TYPE boolean USING (featured != 0)');
                DB::statement('ALTER TABLE projects ALTER COLUMN hidden TYPE boolean USING (hidden != 0)');
                DB::statement('ALTER TABLE projects ALTER COLUMN is_private TYPE boolean USING (is_private != 0)');
                DB::statement('ALTER TABLE services ALTER COLUMN hidden TYPE boolean USING (hidden != 0)');
                DB::statement('ALTER TABLE articles ALTER COLUMN published TYPE boolean USING (published != 0)');
                DB::statement('ALTER TABLE messages ALTER COLUMN read TYPE boolean USING (read != 0)');
            } catch (\Throwable $e) {}
        }
    }
};
