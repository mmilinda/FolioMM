<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'headline',
        'headline_en',
        'bio',
        'bio_en',
        'email',
        'phone',
        'location',
        'availability',
        'availability_en',
        'github',
        'linkedin',
        'twitter',
        'website',
        'photo',
        'avatar',
        'cv_link',
        'cv_link_fr',
        'cv_link_en',
        'years_exp',
        'projects_count',
        'uptime_rate',
        'hero_roles',
        'hero_badges',
        'highlights',
        'section_titles',
    ];

    protected $casts = [
        'hero_roles' => 'array',
        'hero_badges' => 'array',
        'highlights' => 'array',
        'section_titles' => 'array',
    ];
}
