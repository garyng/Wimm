<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router)
{
    return $router->app->version();
});

$router->group(['prefix' => 'authors'], function () use ($router)
{
    $router->get('/', ['uses' => 'AuthorsController@getAll']);
    $router->get('/{id}', ['uses' => 'AuthorsController@get']);
    $router->post('/', ['uses' => 'AuthorsController@create']);
    $router->delete('/{id}', ['uses' => 'AuthorsController@delete']);
    $router->put('/{id}', ['uses' => 'AuthorsController@update']);
});