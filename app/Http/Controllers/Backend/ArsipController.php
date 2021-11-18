<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ArsipModel as Arsip;
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
        $folder_data = public_path('system') . '/' . $nama_folder;
        mkdir($folder_data, 0777);
        Arsip::create([
            'nama_folder' => $nama_folder
        ]);
        return Redirect::route('dashboard.arsip')->with('message', 'Data Berhasil Ditambahkan');
    }

    public function show(Request $request)
    {
        $data_arsip = Arsip::find($request->id);
        $folder_data = public_path('system') . '/' . $data_arsip->nama_folder;
        if (file_exists($folder_data)) {
            return scandir($folder_data);
        } else {
            return false;
        }
    }
}
