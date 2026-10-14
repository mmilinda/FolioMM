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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->nullable();
            $table->string('title');
            $table->string('title_en')->nullable();
            $table->string('category')->default('DevOps & Tech');
            $table->string('category_en')->nullable();
            $table->text('excerpt')->nullable();
            $table->text('desc_en')->nullable();
            $table->longText('content')->nullable();
            $table->json('sections')->nullable();
            $table->string('image')->nullable();
            $table->string('color')->nullable()->default('#38bdf8');
            $table->boolean('published')->default(true);
            $table->string('read_time')->default('5 min');
            $table->string('read_time_en')->nullable();
            $table->integer('views')->default(0);
            $table->integer('likes')->default(0);
            $table->json('tags')->nullable();
            $table->json('author')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};