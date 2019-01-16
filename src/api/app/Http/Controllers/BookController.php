<?php

namespace App\Http\Controllers;

use App\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use Illuminate\Http\Response;

class BookController extends Controller
{
    public function index()
    {
        return BookResource::collection(Book::with(['ratings', 'user'])->get());
    }


    public function store(StoreBookRequest $request)
    {
        $book = Book::create([
            // todo: get user id with custom user repo
            "user_id" => $request->user()->id,
            "title" => $request->title,
            "description" => $request->description
        ]);
        return new BookResource($book);
    }


    public function show(Book $book)
    {
        return new BookResource($book);
    }


    public function update(UpdateBookRequest $request, Book $book)
    {
        $book->update($request->only(['title', 'description']));
        return new BookResource($book);
    }


    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(null, Response::HTTP_OK);
    }
}
