<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArsipModel extends Model
{
    use HasFactory;
    protected $table = "tb_folder";
    protected $guarded = ['id'];

    public function files_list()
    {
        return $this->hasMany(FilesModel::class, 'id_folder');
    }
}
