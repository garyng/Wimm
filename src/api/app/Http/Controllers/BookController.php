<?php

namespace App\Http\Controllers;

use App\Book;
use App\Http\Resources\BookResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookController extends Controller
{
    public function index()
    {
        return BookResource::collection(Book::with(['ratings', 'user'])->get());
    }


    public function store(Request $request)
    {
        $book = Book::create([
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


    public function update(Request $request, Book $book)
    {
        // todo: check user id
        $book->update($request->only(['title', 'description']));
        return new BookResource($book);
    }


    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(null, Response::HTTP_OK);
    }
}
