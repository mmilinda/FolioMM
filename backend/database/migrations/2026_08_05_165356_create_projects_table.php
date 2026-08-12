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
            $table->string('category')->default('Full Stack');
            $table->text('description')->nullable();
            $table->text('full_desc')->nullable();
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->string('image')->nullable();
            $table->string('architecture_diagram')->nullable();
            $table->string('demo')->nullable();
            $table->string('github')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('hidden')->default(false);
            $table->json('technologies')->nullable();
            $table->json('impact')->nullable();
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