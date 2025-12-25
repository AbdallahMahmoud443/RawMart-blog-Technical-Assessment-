<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    //
    use RefreshDatabase;

    protected $seed = True;

    public function setUp(): void
    {
        parent::setUp(); // Setup the test environment.
    }
    public function createUser(array $attributes = []): User
    {
        return User::factory()->create($attributes);
    }
    public function authenticate(): User
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
        $response = $this->post(route('v1:auth:login'), [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);
        $response->assertStatus(200);
        return $user;
    }
}
