<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CmsModel extends Model
{
    use HasFactory;
    protected $table = 'cms_menu';
    protected $guarded = ['id'];
}
