<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    use HasFactory;

    protected $fillable = [
        'stat_id',
        'value',
        'label',
        'label_en',
        'desc',
        'desc_en',
        'order',
    ];
}
