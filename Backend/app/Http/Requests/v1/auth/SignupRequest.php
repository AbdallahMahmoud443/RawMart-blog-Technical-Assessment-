<?php

namespace App\Http\Requests\v1\auth;

use App\Http\payloads\v1\auth\SignupPayload;
use Illuminate\Foundation\Http\FormRequest;


class SignupRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|same:password',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
    public function payload(): SignupPayload
    {
        return new SignupPayload(
            name: $this->validated('name'),
            email: $this->validated('email'),
            password: $this->validated('password'),
            image: $this->validated('image')
        );
    }
}
