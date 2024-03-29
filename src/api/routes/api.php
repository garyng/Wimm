<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->group(function () {

    Route::prefix('debug')->group(function() {
        Route::get('/init', 'DebugController@init');
    });

    Route::middleware('jwt')->group(function () {
        Route::apiResource('records', 'RecordsController');
        Route::apiResource('categories', 'CategoriesController');
        Route::apiResource('budgets', 'BudgetsController');
        Route::apiResource('recurrences', 'RecurrencesController');

        Route::prefix('user')->group(function () {
            Route::get('', 'UsersController@get');
            Route::patch('/currency', 'UsersController@currency');
        });

        Route::prefix('currencies')->group(function() {
            Route::get('', 'CurrenciesController@index');
            Route::get('/{from}/{to}', 'CurrenciesController@convert');
        });

        Route::prefix('debug')->group(function() {
            Route::get('/populate', 'DebugController@populate');
        });
    });
});


