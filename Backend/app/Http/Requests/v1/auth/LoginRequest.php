<?php

namespace App\Http\Requests\v1\auth;

use App\Http\payloads\v1\auth\LoginPayload;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }

    public function payload(): LoginPayload
    {
        return new LoginPayload(
            email: $this->validated('email'),
            password: $this->validated('password')
        );
    }
}
