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
            $table->string('headline_en')->nullable()->default('Full Stack & DevOps Developer');
            $table->text('bio')->nullable();
            $table->text('bio_en')->nullable();
            $table->string('email')->default('mmilinda00@gmail.com');
            $table->string('location')->default('Sénégal 🇸🇳 – Remote');
            $table->string('availability')->default('Ouverte aux opportunités');
            $table->string('availability_en')->nullable()->default('Open to opportunities');
            $table->string('github')->default('https://github.com/mmilinda');
            $table->string('linkedin')->default('https://www.linkedin.com/in/milinda-mendy-5ba17928a/');
            $table->string('photo')->nullable()->default('/images/profile/MM.png');
            $table->string('avatar')->nullable()->default('/images/profile/MM.png');
            $table->string('cv_link')->nullable()->default('/CV-Milinda-Mendy.pdf');
            $table->string('cv_link_fr')->nullable()->default('/CV-Milinda-Mendy-FR.pdf');
            $table->string('cv_link_en')->nullable()->default('/CV-Milinda-Mendy-EN.pdf');
            $table->string('years_exp')->default('5+');
            $table->string('projects_count')->default('30+');
            $table->string('uptime_rate')->default('99.9%');
            $table->json('hero_roles')->nullable();
            $table->json('hero_badges')->nullable();
            $table->json('highlights')->nullable();
            $table->json('section_titles')->nullable();
            $table->timestamps();
        });

        // Table Services
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_en')->nullable();
            $table->text('desc');
            $table->text('desc_en')->nullable();
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
            $table->string('category_en')->nullable();
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

        // Table Stats (Statistiques portfolio pour StatsManager)
        Schema::create('stats', function (Blueprint $table) {
            $table->id();
            $table->string('stat_id')->unique()->nullable();
            $table->string('value');
            $table->string('label');
            $table->string('label_en')->nullable();
            $table->text('desc')->nullable();
            $table->text('desc_en')->nullable();
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
        Schema::dropIfExists('stats');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('impact_metrics');
        Schema::dropIfExists('timelines');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('services');
        Schema::dropIfExists('profiles');
    }
};
