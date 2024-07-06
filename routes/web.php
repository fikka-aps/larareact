<?php

use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use Illuminate\Support\Facades\Mail;

Route::get('/test-email', function () {
    Mail::to('fikkaayups@gmail.com')
    ->send(new VerifyEmail(12324));

});

Route::get('/', function () {
    return view('welcome');
});
