<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Log::info('Starting Project seeding with hasTasks');

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' =>time(),
        ]);

        Project::factory()->count(30)->hasTasks(30)->create();
        Log::info('Finished Project seeding');
    }
}
