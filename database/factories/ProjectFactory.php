<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description'=> fake()->realText(),
            'due_date' => fake()->dateTimeBetween('now','+1 year'),
            'status' => fake()->randomElement(['pending','in_progress','complete']),
            'image_path' => fake()->imageUrl(),
            'created_by' =>1,
            'updated_by' =>1,
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }

    public function configure(){
        return $this->afterMaking(function (Project $project){
            Log::info('Calling hasTasks() for Project ID: ' . $project->id);
        });
    }
}
