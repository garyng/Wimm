<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthorsController extends Controller
{
    public function getAll()
    {
         return response()->json(Author::all());
    }

    public function get($id)
    {
        return response()->json(Author::find($id));
    }

    public function create(Request $request)
    {
        $author = Author::create($request->all());
        return response()->json($author, Response::HTTP_CREATED);
    }

    public function update($id, Request $request)
    {
        $author = Author::findOrFail($id);
        $author->update($request->all());
        return response()->json($author, Response::HTTP_OK);
    }
    public function delete($id)
    {
        Author::findOrFail($id);
        return response()->json("");
    }
}
