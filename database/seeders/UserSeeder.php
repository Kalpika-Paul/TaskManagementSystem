<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    
    public function run(): void
    {
      
         User::create([
            'type' => 'admin',
            'name' => 'User',
            'phone' => '017XXXXXXXX',
            'branch' =>'User Center',
            'email' => 'user@gmail.com',
            'password' => Hash::make('12345'),
            'is_active' => 1,
            'email_verified_at' => now(),
        ]);

    }
}


