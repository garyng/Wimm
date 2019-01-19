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
        // order matters
        $this->call(UsersTableSeeder::class);
        $this->call(BooksTableSeeder::class);
        $this->call(RatingsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(RecordsTableSeeder::class);
        $this->call(RecurrencesTableSeeder::class);
        $this->call(BudgetsTableSeeder::class);
    }
}