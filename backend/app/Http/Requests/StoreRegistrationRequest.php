<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'husbandPhone' => preg_replace('/[\s-]/', '', (string) $this->husbandPhone),
            'wifePhone' => preg_replace('/[\s-]/', '', (string) $this->wifePhone),
        ]);
    }

    public function rules(): array
    {
        return [
            'familyName' => ['required', 'string'],
            'husbandName' => ['required', 'string'],
            'husbandPhone' => ['required', 'regex:/^\d{10,}$/'],
            'wifeName' => ['required', 'string'],
            'wifePhone' => ['required', 'regex:/^\d{10,}$/'],
            'childrenCount' => ['required', 'integer', 'min:0'],
            'childrenBirthYears' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'familyName.required' => 'שדה חובה',
            'husbandName.required' => 'שדה חובה',
            'husbandPhone.required' => 'שדה חובה',
            'husbandPhone.regex' => 'מספר טלפון חייב להכיל 10 ספרות לפחות',
            'wifeName.required' => 'שדה חובה',
            'wifePhone.required' => 'שדה חובה',
            'wifePhone.regex' => 'מספר טלפון חייב להכיל 10 ספרות לפחות',
            'childrenCount.required' => 'שדה חובה',
            'childrenCount.integer' => 'מספר ילדים לא יכול להיות שלילי',
            'childrenCount.min' => 'מספר ילדים לא יכול להיות שלילי',
            'childrenBirthYears.required' => 'שדה חובה',
        ];
    }
}
