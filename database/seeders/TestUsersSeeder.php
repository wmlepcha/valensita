<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@valensita.com',
            'password' => bcrypt('password'),
        ]);

        // Create manager users
        User::factory()->manager()->create([
            'name' => 'Store Manager',
            'email' => 'manager@valensita.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->manager()->create([
            'name' => 'Assistant Manager',
            'email' => 'assistant@valensita.com',
            'password' => bcrypt('password'),
        ]);

        // Create customer users
        User::factory()->customer()->count(10)->create();

        $this->command->info('Test users created successfully!');
        $this->command->info('Admin: admin@valensita.com (password)');
        $this->command->info('Manager: manager@valensita.com (password)');
        $this->command->info('Manager: assistant@valensita.com (password)');
        $this->command->info('Customers: 10 random users created');
    }
}
