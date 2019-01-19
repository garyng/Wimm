<?php

use Illuminate\Database\Seeder;

class RecordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Record::truncate();
        factory(\App\Record::class, 100)->create();
    }
}
