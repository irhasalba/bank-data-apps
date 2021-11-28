<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ArsipModel as Arsip;
use App\Models\FilesModel;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class ArsipController extends Controller
{
    public function index(Request $request)
    {
        $array = array();
        $arsip_data = Arsip::where('id_submenu', $request->id)->get();
        $id = $arsip_data[0];
        foreach ($arsip_data as $key => $values) {
            $array[$key] = [
                'id' => $values->id,
                'id_parent_folder' => $values->id_parent_folder,
                'id_submenu' => $values->id_submenu,
                'nama_folder' => $values->nama_folder,
                'created_at' => $values->created_at,
                'updated_at' => $values->updated_at
            ];
        }
        return Inertia::render('ArsipList', ['arsip' => $array, 'id_parent' => $id->id_parent_folder, 'id_submenu' => $id->id_submenu]);
    }

    public function create(Request $request)
    {
        $submenu_id = $request->id_submenu;
        $check_validate_folder =  Arsip::where('id_submenu', $submenu_id)->get();

        $data = array();
        foreach ($check_validate_folder as $key => $values) {
            $data[$key] = [
                'id_parent' => $values->id_parent_folder,
                'id_submenu' => $values->sub_menu_folder->id,
                'nama_sub_menu' => $values->sub_menu_folder->nama_submenu
            ];
        }
        return Inertia::render('ArsipFolder', ['submenu' => $data[0]]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_folder' => 'required'
        ]);
        $nama_folder = str_replace(' ', '_', $request->nama_folder);
        $folder_data = storage_path('app') . '/' . $nama_folder;
        if (file_exists($folder_data)) {
            return 'Tidak dapat menambahkan data ! ditemukan folder yg sama';
        } else {
            mkdir($folder_data, 0777);
            Arsip::create([
                'id_parent_folder' => $request->id_parent,
                'id_submenu' => $request->id_submenu,
                'nama_folder' => $nama_folder
            ]);
            return Redirect::route('dashboard.list.submenu.folder', $request->id_submenu)->with('message', 'Data Berhasil Ditambahkan');
        }
    }

    public function show(Request $request)
    {
        $data_arsip = Arsip::find($request->id);
        $id = $request->id;
        $folder_data = storage_path('app') . '/' . $data_arsip->nama_folder;
        if (file_exists($folder_data)) {
            $list_file = DB::table('tb_files')->select('tb_files.*')->join('tb_folder', 'tb_folder.id', '=', 'tb_files.id_folder')->where('tb_folder.id', $id)->get();
            return Inertia::render('ListFileFolder', ['listfile' => $list_file, 'id_folder' => $id]);
        } else {
            return false;
        }
    }

    public function upload_file(Request $request)
    {
        $nama_folder = Arsip::find($request->id);
        return Inertia::render('UploadFile', ['folder' => $nama_folder]);
    }
    public function save_file(Request $request)
    {
        $validasi_folder = Arsip::find($request->input('id_folder'));
        if (!empty($validasi_folder)) {
            $nama_file = $request->file('file')->getClientOriginalName();
            $lokasi_file = $validasi_folder->nama_folder;
            $tambah_file = FilesModel::create([
                'id_folder' => $validasi_folder->id,
                'files'   => $request->file('file') ? $request->file('file')->storeAs($lokasi_file, $nama_file) : null
            ]);

            return Redirect::route('dashboard.arsip.folder', $validasi_folder->id)->with('message', 'Data Berhasil Ditambahkan');
        }
    }

    public function show_detail_file(FilesModel $file)
    {
        return Inertia::render('DetailFile', ['detail_file' => $file]);
    }
}
