<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

protected $fillable=[

'title',

'category',

'description',

'problem',

'solution',

'image',

'technologies',

'impact',

'demo',

'github'

];


protected $casts=[

'technologies'=>'array'

];


}