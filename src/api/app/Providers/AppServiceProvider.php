<?php

namespace App\Providers;

use App\Book;
use App\Transformers\BookTransformer;
use Flugg\Responder\Contracts\Transformers\TransformerResolver;
use Illuminate\Http\Resources\Json\Resource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // todo: remove withoutWrapping for resource
        Resource::withoutWrapping();
        $this->app->make(TransformerResolver::class)->bind([
           Book::class => BookTransformer::class
        ]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }

        $this->app->bind(
            \Auth0\Login\Contract\Auth0UserRepository::class,
            \App\Repository\UserRepository::class
        );
    }
}
