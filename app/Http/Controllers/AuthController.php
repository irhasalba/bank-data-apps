<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials, $remember = false)) {
            return Redirect::route('home');
        } else {
            return 'Gagal Login !';
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'password' => 'required',
            'email' => 'required'
        ]);

        User::create([
            'name' => $request->name,
            'password' => password_hash($request->password, PASSWORD_DEFAULT),
            'email' => $request->email
        ]);
        return Redirect::route('home');
    }

    public function logout()
    {
        Auth::logout();
        return Redirect::route('login');
    }
}
