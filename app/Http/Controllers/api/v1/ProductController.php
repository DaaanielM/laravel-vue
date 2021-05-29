<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Product;

class ProductController extends Controller
{
    public function index(){
        $products = Product::with(['categories:id,name'])->get();
        return response()->json(['products' => $products], 200);
    }
    public function store(Request $request){
        $messages = [
            'name.unique' => 'Este nombre ya se encuentra registrado, intente otro'
        ];

        $this->validate(request(), [
            'category_id' => ['required', 'max:100'],
            'name' => ['required', 'max:100', 'unique:products'],
            'description' => ['required', 'max:100'],
            'price' => ['required', 'max:100'],
        ], $messages);
        $product = new Product();
        $product->category_id = $request->category_id;
        $product->img = $request->img;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->save();
        return response()->json(['product' => $product]);
    }
    public function update(Request $request)
    {
        $product = Product::findOrFail($request->id);
        $product->category_id = $request->category_id;
        $product->img = $request->img;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->save();
        return response()->json(['product' => $product]);
    }
}
