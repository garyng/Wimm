<?php

use Faker\Generator as Faker;

$factory->define(\App\Budget::class, function (Faker $faker) {
    return [
        'user_id' => $faker->randomElement(\App\User::all())->id,
        'category_id' => $faker->randomElement(\App\Category::all())->id,
        'limit_per_day' => $faker->randomFloat(2, 20, 200),
        'currency' => 'MYR'
    ];
});
