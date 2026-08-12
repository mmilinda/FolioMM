<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'category',
        'description',
        'full_desc',
        'problem',
        'solution',
        'image',
        'architecture_diagram',
        'demo',
        'github',
        'featured',
        'hidden',
        'technologies',
        'impact',
        'highlights',
        'metrics',
        'architecture_details',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'hidden' => 'boolean',
        'technologies' => 'array',
        'highlights' => 'array',
        'metrics' => 'array',
        'architecture_details' => 'array',
    ];
}