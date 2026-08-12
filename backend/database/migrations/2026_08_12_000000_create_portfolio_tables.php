<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Table Profiles
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Milinda Mendy');
            $table->string('headline')->default('Développeuse Full Stack & Ingénieure DevOps');
            $table->text('bio')->nullable();
            $table->string('email')->default('mmilinda00@gmail.com');
            $table->string('location')->default('Sénégal 🇸🇳 – Remote');
            $table->string('availability')->default('Ouverte aux opportunités');
            $table->string('github')->default('https://github.com/mmilinda');
            $table->string('linkedin')->default('https://www.linkedin.com/in/milinda-mendy-5ba17928a/');
            $table->string('photo')->nullable()->default('/images/profile/MM.png');
            $table->string('avatar')->nullable()->default('/images/profile/MM.png');
            $table->string('cv_link')->nullable()->default('/CV-Milinda-Mendy.pdf');
            $table->string('years_exp')->default('5+');
            $table->string('projects_count')->default('30+');
            $table->string('uptime_rate')->default('99.9%');
            $table->timestamps();
        });

        // Table Services
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('desc');
            $table->string('icon_name')->default('Code2');
            $table->json('tags')->nullable();
            $table->string('glow')->nullable()->default('#38bdf8');
            $table->string('gradient')->nullable()->default('from-blue-500/20 to-cyan-500/20');
            $table->boolean('hidden')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Table Skills
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('icon_name')->default('Cpu');
            $table->json('skills');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Table Timelines
        Schema::create('timelines', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->string('title');
            $table->string('company');
            $table->text('description');
            $table->json('tags')->nullable();
            $table->string('type')->default('work'); // work or education
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Table Impact Metrics
        Schema::create('impact_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('number');
            $table->string('label');
            $table->text('desc');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Table Testimonials
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->text('content');
            $table->string('avatar')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Table Messages
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('subject')->nullable();
            $table->text('message');
            $table->boolean('read')->default(false);
            $table->timestamps();
        });

        // Table Site Settings
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('impact_metrics');
        Schema::dropIfExists('timelines');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('services');
        Schema::dropIfExists('profiles');
    }
};
