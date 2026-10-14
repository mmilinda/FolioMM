<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'title_en',
        'category',
        'category_en',
        'excerpt',
        'desc_en',
        'content',
        'sections',
        'image',
        'color',
        'published',
        'read_time',
        'read_time_en',
        'views',
        'likes',
        'tags',
        'author',
        'published_at',
    ];

    protected $casts = [
        'published' => 'boolean',
        'sections' => 'array',
        'tags' => 'array',
        'author' => 'array',
        'published_at' => 'datetime',
    ];
}
