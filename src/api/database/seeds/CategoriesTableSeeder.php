<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Category::truncate();
        $categories = ['Food & Drinks', 'Rental', 'Shopping', 'Transportation', 'Entertainment', 'Electronics', 'Income'];
        foreach ($categories as $category)
        {
            \App\Category::create([
                'name' => $category
            ]);
        }
    }
}
