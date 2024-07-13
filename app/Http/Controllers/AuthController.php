<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\ProgramResource;
use App\Models\EmailVerification;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
        $verification = EmailVerification::where('token', $token)->first();

        if (!$verification) {
            return response()->json(['message' => 'Invalid verification token.'], 400);
        }

        $user = $verification->user;
        if ($user->email_verified_at) {
            return response()->json(['message' => 'Email is already verified.'], 200);
        }

        $user->email_verified_at = now();
        $user->save();

        $token = $user->createToken('main')->plainTextToken;

        // Delete the verification token after successful verification
        $verification->delete();

        return response([
            'user' => $user,
            'token' => $token,
            'message' => 'Email verified successfully'
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
        if (!$user->email_verified_at) {
            Auth::logout(); // Logout the user
            return response([
                'error' => 'Your email is not verified. Please verify your email before logging in.'
            ], 403);
        }
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
    public function getProgram()
    {
        $activePrograms = Program::where('status', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return ProgramResource::collection($activePrograms);
    }
}
