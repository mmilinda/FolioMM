<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'icon_name',
        'tags',
        'glow',
        'gradient',
        'hidden',
        'order',
    ];

    protected $casts = [
        'tags' => 'array',
        'hidden' => 'boolean',
    ];
}
