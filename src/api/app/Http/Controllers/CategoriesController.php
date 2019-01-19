<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoriesController extends Controller
{
    public function index()
    {
        return responder()->success(Category::all())->respond();
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create([
            'name' => $request->name
        ]);
        return responder()->success($category)->respond();
    }

    public function show(Category $category)
    {
        return responder()->success($category)->respond();
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->only('name'));
        return responder()->success($category)->respond();
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return responder()->success($category)->respond();
    }
}
