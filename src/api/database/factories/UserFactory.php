<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
//    $hash = Hash::make("pass");
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'currency' => $faker->currencyCode,
        'auth0id' => '',
//        'email_verified_at' => now(),
//        'password' => $hash
//        'remember_token' => str_random(10),
    ];
});
