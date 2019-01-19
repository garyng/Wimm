<?php

use Faker\Generator as Faker;

$factory->define(\App\Recurrence::class, function (Faker $faker) {
    return [
        'user_id' => $faker->randomElement(\App\User::all())->id,
        'category_id' => $faker->randomElement(\App\Category::all())->id,
        'amount' => $faker->randomFloat(2, -200, 200),
        'description' => $faker->sentence(),
        'frequency' => $faker->randomElement(['daily', 'weekly', 'monthly']),
        'next_timestamp' => $faker->dateTimeBetween('now', '10 days')->getTimestamp(),
        'currency' => 'MYR'
    ];
});
