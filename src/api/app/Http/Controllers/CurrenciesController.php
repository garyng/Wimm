<?php

namespace App\Http\Controllers;

use App\Currency;
use Illuminate\Http\Request;
use Swap\Laravel\Facades\Swap;

class CurrenciesController extends Controller
{
    public function index()
    {
        return responder()->success(Currency::all())->respond();
    }

    public function convert(Request $request, $from, $to)
    {
        $pair = $from . '/' . $to;
        $rate = Swap::latest(strtoupper($pair));
        return responder()->success([$rate->getValue()])->respond();
    }
}
