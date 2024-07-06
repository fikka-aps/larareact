<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $verificationToken = Str::random(60);

        EmailVerification::create([
            'user_id' => $user->id,
            'token' => $verificationToken,
        ]);

        // Send verification email
        Mail::to($user->email)->send(new \App\Mail\VerifyEmail($verificationToken));

        return response()->json([
            'message' => 'Registration successful, please check your email for verification instructions.',
        ]);
    }

    public function verifyEmail($token)
    {
        $verification = EmailVerification::where('token', $token)->firstOrFail();

        $user = $verification->user;
        $token = $user->createToken('main')->plainTextToken;

        // Delete the verification token after successful verification
        $verification->delete();

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
    public function me(Request $request)
    {
        return $request->user();
    }
}
