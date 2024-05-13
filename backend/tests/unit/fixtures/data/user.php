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

  [
    'username' => 'user',
    'email' => 'user@example.com',
    'password' => '123123123',
    'privilege' => 'user',
    'auth_key' => Yii::$app->security->generateRandomString(),
    'access_token' => Yii::$app->security->generateRandomString(),
    'created_at' => time(),
    'updated_at' => time(),
  ],
];
