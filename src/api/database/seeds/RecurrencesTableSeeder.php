<?php

use Illuminate\Database\Seeder;

class RecurrencesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Recurrence::truncate();
        factory(\App\Recurrence::class, 100)->create();
    }
}
