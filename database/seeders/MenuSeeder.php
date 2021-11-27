<?php

namespace Database\Seeders;

use App\Models\CmsModel;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CmsModel::create([
            'nama_menu' => 'Informasi',
        ]);
        CmsModel::create([
            'nama_menu' => 'Data Arsip',
        ]);
    }
}
