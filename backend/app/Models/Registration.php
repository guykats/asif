<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'family_name',
        'husband_name',
        'husband_phone',
        'wife_name',
        'wife_phone',
        'children_count',
        'children_birth_years',
    ];
}
