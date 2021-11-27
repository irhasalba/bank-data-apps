<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CmsSubMenu extends Model
{
    use HasFactory;
    protected $table = 'cms_submenu';
    protected $guarded = ['id'];

    public function menu()
    {
        return $this->belongsTo(CmsModel::class, 'id_parent_menu', 'id');
    }
}
