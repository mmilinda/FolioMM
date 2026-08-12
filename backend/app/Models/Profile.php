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
        'bio',
        'email',
        'location',
        'availability',
        'github',
        'linkedin',
        'photo',
        'avatar',
        'cv_link',
        'years_exp',
        'projects_count',
        'uptime_rate',
    ];
}
