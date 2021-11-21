<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilesModel extends Model
{
    use HasFactory;

    protected $table = 'tb_files';
    protected $guarded = ['id'];

    public function folder()
    {
        return $this->belongsTo(ArsipModel::class, 'id_folder');
    }
}
