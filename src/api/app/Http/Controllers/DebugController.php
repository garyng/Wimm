<?php

namespace App\Http\Controllers;

use App\Budget;
use App\Record;
use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class DebugController extends Controller
{
    public function init() {

        Artisan::call('migrate', ["--force"=> true ]);

        $seeder = new \DatabaseSeeder();
        $seeder->run();
        return responder()->success()->respond();
    }

    public function populate() {
        // add some sample data
        $userId = request()->user()->id;

        $records = factory(Record::class, 10)->create([
            'user_id' => $userId
        ]);
        $budgets = factory(Budget::class, 4)->create([
            'user_id' => $userId
        ]);

        return responder()->success([
            'records' => $records,
            'budgets' => $budgets
        ])->respond();
    }
}
