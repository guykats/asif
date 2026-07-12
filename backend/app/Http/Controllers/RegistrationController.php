<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegistrationRequest;
use App\Models\Registration;

class RegistrationController extends Controller
{
    public function store(StoreRegistrationRequest $request)
    {
        $data = $request->validated();

        $registration = Registration::create([
            'family_name' => $data['familyName'],
            'husband_name' => $data['husbandName'],
            'husband_phone' => $data['husbandPhone'],
            'wife_name' => $data['wifeName'],
            'wife_phone' => $data['wifePhone'],
            'children_count' => $data['childrenCount'],
            'children_birth_years' => $data['childrenBirthYears'],
        ]);

        return response()->json(['id' => $registration->id], 201);
    }
}
