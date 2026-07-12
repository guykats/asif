<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AssetController extends Controller
{
    private const ALLOWED_KEYS = ['logo', 'hero'];

    public function index()
    {
        $assets = Setting::pluck('value', 'key');

        return response()->json(['assets' => $assets]);
    }

    public function upload(string $key, Request $request)
    {
        if (! in_array($key, self::ALLOWED_KEYS, true)) {
            return response()->json(['error' => 'נכס לא מוכר'], 400);
        }

        try {
            $request->validate([
                'file' => ['required', 'file', 'mimes:png,jpg,jpeg,webp,svg', 'max:8192'],
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'סוג קובץ לא נתמך או לא התקבל קובץ'], 400);
        }

        $previous = Setting::find($key);

        $file = $request->file('file');
        $filename = $key.'-'.now()->timestamp.'.'.$file->getClientOriginalExtension();
        $file->storeAs('uploads', $filename, 'public');
        $url = '/storage/uploads/'.$filename;

        Setting::updateOrCreate(['key' => $key], ['value' => $url]);

        if ($previous && str_starts_with($previous->value, '/storage/uploads/')) {
            Storage::disk('public')->delete('uploads/'.basename($previous->value));
        }

        return response()->json(['key' => $key, 'url' => $url]);
    }
}
