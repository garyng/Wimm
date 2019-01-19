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
        $this->app->make(TransformerResolver::class)->bind([
            \App\Book::class => \App\Transformers\BookTransformer::class,
            \App\Record::class => \App\Transformers\RecordTransformer::class,
            \App\Category::class => \App\Transformers\CategoryTransformer::class,
            \App\Budget::class => \App\Transformers\BudgetTransformer::class,
            \App\User::class => \App\Transformers\UserTransformer::class,
            \App\Recurrence::class => \App\Transformers\RecurrenceTransformer::class
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
            \App\Repository\UserRepository::class,
            \App\Repository\UserRepository::class
        );
    }
}
