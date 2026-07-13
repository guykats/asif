<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    private const RESERVED_KEYS = ['logo', 'hero'];

    public function index()
    {
        $content = Setting::query()
            ->whereNotIn('key', self::RESERVED_KEYS)
            ->pluck('value', 'key');

        return response()->json(['content' => $content]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'content' => ['required', 'array'],
            'content.*' => ['nullable', 'string', 'max:5000'],
        ]);

        foreach ($data['content'] as $key => $value) {
            if (in_array($key, self::RESERVED_KEYS, true)) {
                continue;
            }

            Setting::updateOrCreate(['key' => $key], ['value' => (string) $value]);
        }

        return response()->json(['ok' => true]);
    }
}
