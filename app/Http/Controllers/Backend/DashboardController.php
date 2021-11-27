<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\CmsModel;
use App\Models\CmsSubMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $all_menu = CmsModel::all();
        return Inertia::render('Home', ['menu' => $all_menu]);
    }

    public function sub_menu(Request $request)
    {
        $submenu = CmsSubMenu::where('id_parent_menu', $request->id)->get();
        return Inertia::render('SubMenuPages', ['submenu' => $submenu, 'id_parent' => $request->id]);
    }

    public function tambah_submenu(Request $request)
    {
        $id = $request->id;
        return Inertia::render('TambahSubMenu', ['id_parent' => $id]);
    }

    public function store_submenu(Request $request)
    {
        CmsSubMenu::create([
            'id_parent_menu' => $request->id_parent,
            'nama_submenu' => $request->subfolder,

        ]);
        return Redirect::route('dashboard.submenu', $request->id_parent)->with('message', 'Data Berhasil Ditambahkan');
    }
}
