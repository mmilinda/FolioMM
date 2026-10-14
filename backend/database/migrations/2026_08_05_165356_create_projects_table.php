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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->nullable();
            $table->string('title');
            $table->string('title_en')->nullable();
            $table->string('category')->default('Full Stack');
            $table->string('category_en')->nullable();
            $table->string('year')->nullable()->default('2026');
            $table->string('status')->nullable()->default('Production');
            $table->string('status_en')->nullable()->default('Production');
            $table->string('client')->nullable();
            $table->string('client_en')->nullable();
            $table->string('role')->nullable();
            $table->string('role_en')->nullable();
            $table->text('description')->nullable();
            $table->text('description_en')->nullable();
            $table->text('full_desc')->nullable();
            $table->text('problem')->nullable();
            $table->text('problem_en')->nullable();
            $table->text('solution')->nullable();
            $table->text('solution_en')->nullable();
            $table->text('impact')->nullable();
            $table->text('impact_en')->nullable();
            $table->string('image')->nullable();
            $table->string('fallback_image')->nullable();
            $table->string('architecture_diagram')->nullable();
            $table->string('demo')->nullable();
            $table->string('github')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('hidden')->default(false);
            $table->boolean('is_private')->default(false);
            $table->integer('order')->default(0);
            $table->json('technologies')->nullable();
            $table->json('highlights')->nullable();
            $table->json('metrics')->nullable();
            $table->json('architecture_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};