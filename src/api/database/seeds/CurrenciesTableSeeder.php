<?php

use Illuminate\Database\Seeder;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Currency::truncate();
        \App\Currency::create(['code' => 'USD', 'name' => 'United States dollar']);
        \App\Currency::create(['code' => 'MYR', 'name' => 'Malaysian ringgit']);
        \App\Currency::create(['code' => 'SGD', 'name' => 'Singapore dollar']);
        \App\Currency::create(['code' => 'EUR', 'name' => 'Euro']);
        \App\Currency::create(['code' => 'AUD', 'name' => 'Australian dollar']);
        \App\Currency::create(['code' => 'CAD', 'name' => 'Canadian dollar']);
        \App\Currency::create(['code' => 'GBP', 'name' => 'Pound sterling']);
        \App\Currency::create(['code' => 'IDR', 'name' => 'Indonesian rupiah']);
        \App\Currency::create(['code' => 'JPY', 'name' => 'Japanese yen']);
        \App\Currency::create(['code' => 'PHP', 'name' => 'Philippine peso']);
        \App\Currency::create(['code' => 'THB', 'name' => 'Thai baht']);
    }
}
