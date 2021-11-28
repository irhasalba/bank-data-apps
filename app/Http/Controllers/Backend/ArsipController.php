<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ArsipModel as Arsip;
use App\Models\CmsSubMenu;
use App\Models\FilesModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class ArsipController extends Controller
{
    public function index(Request $request)
    {
        $array = array();
        $arsip_data = Arsip::where('id_submenu', $request->sub_parent)->get();
        if (!$arsip_data->isEmpty()) {
            $id = $arsip_data[0];
            $parent_folder =  $id->id_parent_folder;
            $submenu_id = $id->id_submenu;
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
        } else {
            $id = 0;
            $parent_folder =  $request->parent;
            $submenu_id = $request->sub_parent;
        }
        return Inertia::render('ArsipList', ['arsip' => $array, 'id_parent' => $parent_folder, 'id_submenu' => $submenu_id]);
    }

    public function create(Request $request)
    {
        $submenu_id = $request->id_submenu;
        $data = array();
        $check_validate_folder =  Arsip::where('id_submenu', $submenu_id)->get();
        if (!$check_validate_folder->isEmpty()) {
            foreach ($check_validate_folder as $key => $values) {
                $data[$key] = [
                    'id_parent' => $values->id_parent_folder,
                    'id_submenu' => $values->sub_menu_folder->id,
                    'nama_sub_menu' => $values->sub_menu_folder->nama_submenu
                ];
            }
        } else {
            $get_parent = CmsSubMenu::find($request->id_submenu);
            $data[0] = [
                'id_parent' => $request->id_parent,
                'id_submenu' => $request->id_submenu,
                'nama_sub_menu' => $get_parent->nama_submenu
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
            return Redirect::route('dashboard.list.submenu.folder', ['parent' => $request->id_parent, 'sub_parent' => $request->id_submenu])->with('message', 'Data Berhasil Ditambahkan');
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
            return 'folder tidak ditemukan !';
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
        $photo_array = array();
        if (!empty($validasi_folder)) {
            $files = $request->file('file');
            foreach ($files as $file) {
                $lokasi_file = $validasi_folder->nama_folder;
                $nama_file = $file->getClientOriginalName();
                $tambah_file = FilesModel::create([
                    'id_folder' => $validasi_folder->id,
                    'files'   => $file ? $file->storeAs($lokasi_file, $nama_file) : null
                ]);
            }

            return Redirect::route('dashboard.arsip.folder', $validasi_folder->id)->with('message', 'Data Berhasil Ditambahkan');
        }
    }

    public function show_detail_file(FilesModel $file)
    {

        return Inertia::render('DetailFile', ['detail_file' => $file]);
    }

    public function delete_file(Request $request)
    {
        $delete_file = FilesModel::find($request->id);
        $parent_folder = Arsip::find($delete_file->id_folder);
        if (!is_null($delete_file)) {
            $cek_path = storage_path('app') . '/' . $delete_file->files;
            if (file_exists($cek_path)) {
                $exp = explode('/', $delete_file->files);
                unlink($cek_path);
                $delete_file->delete();
                return Redirect::route('dashboard.arsip.folder', $parent_folder->id);
            } else {
                return 'gagal !';
            }
        }
    }
}
