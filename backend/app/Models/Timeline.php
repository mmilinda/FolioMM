<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    use HasFactory;

    protected $fillable = [
        'year',
        'title',
        'title_en',
        'company',
        'description',
        'description_en',
        'tags',
        'type',
        'order',
    ];

    protected $casts = [
        'tags' => 'array',
    ];
}
