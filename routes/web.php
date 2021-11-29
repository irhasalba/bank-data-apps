<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\ArsipController;
use App\Http\Controllers\Backend\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\FilesModel as File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\File as FileStorage;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Login');
})->name('login');
Route::get('/register', function () {
    return Inertia::render('Register');
})->name('regis');
Route::post('/users', [AuthController::class, 'store'])->name('user.register');
Route::post('/user/auth', [AuthController::class, 'index'])->name('user.login');
Route::get('/user/logout', [AuthController::class, 'logout'])->name('user.logout');
Route::get('/home', [DashboardController::class, 'index'])->name('home')->middleware('auth');
Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.', 'middleware' => 'auth'], function () {
    Route::get('/home/submenu/{id}', [DashboardController::class, 'sub_menu'])->name('submenu');
    Route::get('/home/submenu/folder/{parent}/{sub_parent}', [ArsipController::class, 'index'])->name('list.submenu.folder');
    Route::get('/home/tambah/submenu/{id}', [DashboardController::class, 'tambah_submenu'])->name('tambah.submenu');
    Route::post('/home/tambah/simpan/submenu', [DashboardController::class, 'store_submenu'])->name('create.submenu');
    Route::get('/arsip/tambah/{id_parent}/{id_submenu}', [ArsipController::class, 'create'])->name('tambah.arsip');
    Route::post('/arsip/tambah/simpan', [ArsipController::class, 'store'])->name('simpan.arsip');
    Route::get('/arsip/folder/{id}', [ArsipController::class, 'show'])->name('arsip.folder');
    Route::get('/arsip/folder/uploads/{id}', [ArsipController::class, 'upload_file'])->name('arsip.upload');
    Route::post('/upload/file', [ArsipController::class, 'save_file'])->name('save.upload');
    Route::get('/arsip/{file}', [ArsipController::class, 'show_detail_file'])->name('show.files');
    Route::get('/photo/file/{id}', function ($id) {
        $path = File::find($id);
        $pathfolder = storage_path('app') . '/' . $path->files;
        if (file_exists($pathfolder)) {
            $url_file = FileStorage::get($pathfolder);
            $type =  FileStorage::mimeType($pathfolder);
            $response = Response::make($url_file, 200);
            $response->header("Content-Type", $type);
            return $response;
        } else {
            abort(404);
        }
    })->name('photo');

    Route::delete('/files/delete/{id}', [ArsipController::class, 'delete_file'])->name('hapus.file');
});
