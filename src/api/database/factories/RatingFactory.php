<?php

use Faker\Generator as Faker;

$factory->define(\App\Rating::class, function (Faker $faker) {
    return [
        'user_id' => $faker->randomElement(\App\User::all())->id,
        'book_id' => $faker->randomElement(\App\Book::all())->id,
        'rating' => $faker->numberBetween(0, 10)
    ];
});
