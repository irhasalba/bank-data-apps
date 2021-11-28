<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\ArsipController;
use App\Http\Controllers\Backend\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\FilesModel as File;


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
});
Route::post('/users', [AuthController::class, 'store'])->name('user.register');
Route::get('/home', [DashboardController::class, 'index'])->name('home');
Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
    Route::get('/home/submenu/{id}', [DashboardController::class, 'sub_menu'])->name('submenu');
    Route::get('/home/submenu/folder/{id}', [ArsipController::class, 'index'])->name('list.submenu.folder');
    Route::get('/home/tambah/submenu/{id}', [DashboardController::class, 'tambah_submenu'])->name('tambah.submenu');
    Route::post('/home/tambah/simpan/submenu', [DashboardController::class, 'store_submenu'])->name('create.submenu');
    Route::get('/arsip/tambah/{id_parent}/{id_submenu}', [ArsipController::class, 'create'])->name('tambah.arsip');
    Route::post('/arsip/tambah/simpan', [ArsipController::class, 'store'])->name('simpan.arsip');
    Route::get('/arsip/folder/{id}', [ArsipController::class, 'show'])->name('arsip.folder');
    Route::get('/arsip/folder/uploads/{id}', [ArsipController::class, 'upload_file'])->name('arsip.upload');
    Route::post('/upload/file', [ArsipController::class, 'save_file'])->name('save.upload');
    Route::get('/arsip/{file}', [ArsipController::class, 'show_detail_file'])->name('show.files');
});
