<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AuthorSeeder::class);
    }
}

class AuthorSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $populator = populator();
        $populator->add(App\Author::class, 10, [
            'github' => function() use ($faker) { return "@$faker->userName"; },
            'twitter' => function() use ($faker) { return "@{$faker->userName}"; },
            'latest_article_published' => function() use ($faker) { return $faker->dateTime(); }
        ]);
        $populator->execute();
    }
}
