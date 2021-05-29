<?php

use Illuminate\Database\Seeder;
use App\Model\Product;
class ProductSeeder extends Seeder
{

    public function run()
    {
        $products = array(
        [
            'category_id' => 1,
            'name' => 'Coca',
            'description' => '900 ml, con azucar',
            'price' => 2000,
            'img' => 'https://images.unsplash.com/photo-1594881798661-4c77c99551a8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80'],
        [
            'category_id' => 2,
            'name' => 'Campesina',
            'description' => 'Tiene carne, vegetales y maíz',
            'price' => 10000,
            'img' => 'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        ],
        [
            'category_id' => 3,
            'name' => 'De la casa',
            'description' => 'Tiene carne, vegetales y queso',
            'price' => 12000,
            'img' => 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
    );
        foreach($products as $product){
            Product::updateOrCreate($product);
        }
    }
}
