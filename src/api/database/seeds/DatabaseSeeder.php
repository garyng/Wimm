<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
    }
}

class UsersTableSeeder extends Seeder
{
    // from https://github.com/guidocella/eloquent-populator
    public function run()
    {
        \App\User::truncate();
        $faker = \Faker\Factory::create();

        $password = Hash::make('pass');
        factory(\App\User::class, 1)->create([
            'name' => 'admin',
            'password' => $password
        ]);
        factory(\App\User::class, 10)->create([
            'password' => $password
        ]);
    }
}