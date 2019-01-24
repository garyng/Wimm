<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::truncate();
        factory(\App\User::class, 10)->create();

//        $faker = \Faker\Factory::create();
//        $password = Hash::make('pass');
//        factory(\App\User::class, 1)->create([
//            'name' => 'admin',
//            'password' => $password
//        ]);
//        factory(\App\User::class, 10)->create([
//            'password' => $password
//        ]);
    }
}


