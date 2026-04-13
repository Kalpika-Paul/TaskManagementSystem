<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_loads()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_user_can_create_task()
{
    $user = User::factory()->create([
        'is_active' => 1,
    ]);

    $this->actingAs($user, 'sanctum');

    $response = $this->postJson('/api/task-manage', [
        'title' => 'Test Task',
        'description' => 'Test Description',
        'priority' => 'high', 
        'due_date' => now()->addDay()->toDateString(), 
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('task_manages', [
        'title' => 'Test Task',
    ]);
}    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
            'is_active' => 1,
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123'
        ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'token',
            'user'
        ]);
    }
}