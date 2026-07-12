<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $admin = Admin::where('username', (string) $request->input('username'))->first();

        if (! $admin || ! Hash::check((string) $request->input('password'), $admin->password)) {
            return response()->json(['error' => 'שם משתמש או סיסמה שגויים'], 401);
        }

        $token = $admin->createToken('admin-dashboard')->plainTextToken;

        return response()->json(['token' => $token, 'username' => $admin->username]);
    }

    public function changePassword(Request $request)
    {
        /** @var Admin $admin */
        $admin = $request->user();

        if (! Hash::check((string) $request->input('currentPassword'), $admin->password)) {
            return response()->json(['error' => 'הסיסמה הנוכחית שגויה'], 401);
        }

        $newPassword = (string) $request->input('newPassword');
        if (strlen($newPassword) < 6) {
            return response()->json(['error' => 'הסיסמה החדשה חייבת להכיל לפחות 6 תווים'], 400);
        }

        $admin->update(['password' => $newPassword]);

        return response()->json(['ok' => true]);
    }
}
