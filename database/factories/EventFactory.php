<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Event>
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 month', '+2 months');
        $endDate = $this->faker->dateTimeBetween($startDate, $startDate->format('Y-m-d H:i:s') . ' +6 hours');

        return [
            'name' => $this->faker->sentence(3),
            'start_datetime' => $startDate,
            'end_datetime' => $this->faker->boolean(80) ? $endDate : null,
            'image' => $this->faker->boolean(60) ? 'events/' . $this->faker->image(null, 640, 480, null, false) : null,
            'video_link' => $this->faker->boolean(40) ? $this->faker->url() : null,
            'web_link' => $this->faker->boolean(50) ? $this->faker->url() : null,
            'category' => $this->faker->randomElement(['Umum', 'Pemuda', 'Budaya', 'Olahraga', 'Pariwisata']),
        ];
    }
}