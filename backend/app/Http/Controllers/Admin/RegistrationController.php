<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::orderByDesc('created_at')->get()->map(function (Registration $r) {
            return [
                'id' => $r->id,
                'family_name' => $r->family_name,
                'husband_name' => $r->husband_name,
                'husband_phone' => $r->husband_phone,
                'wife_name' => $r->wife_name,
                'wife_phone' => $r->wife_phone,
                'children_count' => $r->children_count,
                'children_birth_years' => $r->children_birth_years,
                'created_at' => $r->created_at->format('Y-m-d H:i:s'),
            ];
        });

        return response()->json(['registrations' => $registrations]);
    }

    public function destroy(Registration $registration)
    {
        $registration->delete();

        return response()->json(['ok' => true]);
    }

    public function exportCsv(): StreamedResponse
    {
        $headers = ['תאריך', 'שם משפחה', 'שם האיש', 'טלפון האיש', 'שם האישה', 'טלפון האישה', 'מספר ילדים', 'שנות לידה'];

        return response()->streamDownload(function () use ($headers) {
            echo "\xEF\xBB\xBF";
            $out = fopen('php://output', 'w');
            fputcsv($out, $headers);

            Registration::orderByDesc('created_at')->each(function (Registration $r) use ($out) {
                fputcsv($out, [
                    $r->created_at->format('Y-m-d H:i:s'),
                    $r->family_name,
                    $r->husband_name,
                    $r->husband_phone,
                    $r->wife_name,
                    $r->wife_phone,
                    $r->children_count,
                    $r->children_birth_years,
                ]);
            });

            fclose($out);
        }, 'registrations.csv', ['Content-Type' => 'text/csv; charset=utf-8']);
    }
}
