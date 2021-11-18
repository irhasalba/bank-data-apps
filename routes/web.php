<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\ArsipController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home');
Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
    Route::get('/home/arsip', [ArsipController::class, 'index'])->name('arsip');
    Route::get('/arsip/tambah-folder', [ArsipController::class, 'create'])->name('tambah.arsip');
    Route::post('/arsip/tambah/simpan', [ArsipController::class, 'store'])->name('simpan.arsip');
    Route::get('/arsip/folder/{id}', [ArsipController::class, 'show'])->name('arsip.folder');
});
