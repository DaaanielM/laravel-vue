<?php

use Illuminate\Database\Seeder;
use App\Model\Category;
class CategorySeeder extends Seeder
{

    public function run()
    {
        $categories = array(
            ['name' => 'Bebidas'],
            ['name' => 'Mazorcadas'],
            ['name' => 'Hamburguesas'],
        );
        foreach($categories as $category){
            Category::updateOrCreate($category);
        }
    }

}
