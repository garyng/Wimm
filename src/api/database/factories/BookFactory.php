<?php

use Faker\Generator as Faker;

$factory->define(App\Book::class, function (Faker $faker) {
    return [
        'user_id' => $faker->randomElement(\App\User::all())->id,
        'title' => $faker->sentence(3),
        'description' => $faker->text()
    ];
});
