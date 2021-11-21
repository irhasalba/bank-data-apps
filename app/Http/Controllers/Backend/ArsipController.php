<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ArsipModel as Arsip;
use App\Models\FilesModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class ArsipController extends Controller
{
    public function index()
    {
        $arsip_data = Arsip::all();
        return Inertia::render('ArsipList', ['arsip' => $arsip_data]);
    }

    public function create()
    {
        return Inertia::render('ArsipFolder');
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_folder' => 'required'
        ]);
        $nama_folder = str_replace(' ', '_', $request->nama_folder);
        $folder_data = storage_path('app') . '/' . $nama_folder;
        mkdir($folder_data, 0777);
        Arsip::create([
            'nama_folder' => $nama_folder
        ]);
        return Redirect::route('dashboard.arsip')->with('message', 'Data Berhasil Ditambahkan');
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
