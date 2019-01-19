<?php

use Faker\Generator as Faker;

$factory->define(\App\Record::class, function (Faker $faker) {
    return [
        'amount' => $faker->randomFloat(2, -200, 200),
        'description' => $faker->sentence(),
        'category_id' => $faker->randomElement(\App\Category::all())->id
    ];
});
