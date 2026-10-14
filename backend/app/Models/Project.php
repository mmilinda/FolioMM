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
        'title_en',
        'category',
        'category_en',
        'year',
        'status',
        'status_en',
        'client',
        'client_en',
        'role',
        'role_en',
        'description',
        'description_en',
        'full_desc',
        'problem',
        'problem_en',
        'solution',
        'solution_en',
        'impact',
        'impact_en',
        'image',
        'fallback_image',
        'architecture_diagram',
        'demo',
        'github',
        'featured',
        'hidden',
        'is_private',
        'order',
        'technologies',
        'highlights',
        'metrics',
        'architecture_details',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'hidden' => 'boolean',
        'is_private' => 'boolean',
        'technologies' => 'array',
        'highlights' => 'array',
        'metrics' => 'array',
        'architecture_details' => 'array',
    ];
}