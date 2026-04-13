<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    
    public function run(): void
    {
      
        User::firstOrCreate(
            ['email' => 'user@gmail.com'],
            [
                'type' => 'user',
                'name' => 'User',
                'phone' => '017XXXXXXXX',
                'password' => Hash::make('12345'),
                'is_active' => 1,
                'email_verified_at' => now(),
            ]);
    }
}


