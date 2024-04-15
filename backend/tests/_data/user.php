<?php
return [
  [
    'username' => 'admin',
    'email' => 'admin@example.com',
    'password' => '123123123',
    'privilege' => 'admin',
    'auth_key' => Yii::$app->security->generateRandomString(),
    'access_token' => Yii::$app->security->generateRandomString(),
    'created_at' => time(),
    'updated_at' => time(),
  ],
];
// <?php

// namespace app\fixtures;

// use yii\test\ActiveFixture;

// class UserFixture extends ActiveFixture
// {
//   public $modelClass = 'app\models\User';

//   public $dataFile = '@app/fixtures/data/user.php';
// }
