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
        'category',
        'excerpt',
        'content',
        'image',
        'published',
        'read_time',
        'views',
        'likes',
        'tags',
        'published_at',
    ];

    protected $casts = [
        'published' => 'boolean',
        'tags' => 'array',
        'published_at' => 'datetime',
    ];
}
