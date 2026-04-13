<?php

namespace App\Http\Controllers;

use App\Models\TaskManage;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{


    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    if (!$user->is_active) {
        return response()->json(['message' => 'Account not active'], 403);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
}


public function dashboard()
{
    $user = auth()->user();

    $pendingTasks = TaskManage::where('user_id', $user->id)
        ->where('status', 'pending')
        ->count();

    $completedTasks = TaskManage::where('user_id', $user->id)
        ->where('status', 'completed')
        ->count();

    return response()->json([
        'user' => $user,
        'pending_tasks' => $pendingTasks,
        'completed_tasks' => $completedTasks,
    ]);
}
    
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }

   
}