<?php

namespace App\Http\Controllers;

use App\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;

class BookController extends Controller
{
    public function index()
    {
        return responder()->success(Book::all());
    }


    public function store(StoreBookRequest $request)
    {
        $book = Book::create([
            "user_id" => $request->user()->id,
            "title" => $request->title,
            "description" => $request->description
        ]);
        return responder()->success($book);
    }


    public function show(Book $book)
    {
        return responder()->success($book)->respond();
    }


    public function update(UpdateBookRequest $request, Book $book)
    {
        // todo: move authentication out to here
        // if ($book->user_id !== $request->user()->id) return response()->error?
        $book->update($request->only(['title', 'description']));
        return responder()->success($book);

    }


    public function destroy(Book $book)
    {
        $book->delete();
        return responder()->success();
    }
}
