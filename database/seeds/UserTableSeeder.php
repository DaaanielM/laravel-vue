<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = array([
            'name' => 'Daniel Brand',
            'email' => 'daniel@gmail.com',
            'password' => \Hash::make('daniel123')
        ]);
        foreach ($users as $user) {
            User::updateOrCreate($user);
        }
    }
}
