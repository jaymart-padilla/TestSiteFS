<?php

namespace app\controllers;

use app\models\User;
use Yii;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\web\UnauthorizedHttpException;

class AuthController extends Controller
{
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
            ],
        ];
    }

    public function actionSignup()
    {
        $username = Yii::$app->request->post('username');
        $email = Yii::$app->request->post('email');
        $password = Yii::$app->request->post('password');

        $user = new User();
        $user->username = $username;
        $user->email = $email;
        $user->setPassword($password);
        $user->generateAuthKey();
        $user->generateAccessToken();

        if ($user->save()) {
            // Log in the user
            Yii::$app->user->login($user);

            return $this->asJson(['token' => $user->access_token]);
        } else {
            if ($user->hasErrors()) {
                throw new BadRequestHttpException(json_encode($user->getErrors()));
            } else {
                throw new BadRequestHttpException('Failed to create user');
            }
        }
    }

    public function actionLogin()
    {
        $username = Yii::$app->request->post('username');
        $password = Yii::$app->request->post('password');

        $user = User::findByUsername($username);

        if ($user && $user->validatePassword($password)) {
            // Log in the user
            Yii::$app->user->login($user);

            return $this->asJson(['token' => $user->access_token]);
        } else {
            throw new UnauthorizedHttpException('Invalid username or password');
        }
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();
    }

    public function actionCheckAuth()
    {
        $currentUser = Yii::$app->user->identity;

        if (!$currentUser) {
            return $this->asJson(['authenticated' => false]);
        }

        // Get the access token from sessionStorage
        $sessionStorageToken = Yii::$app->request->post('access_token');

        // Compare the access token from sessionStorage with the current user's access token
        if ($sessionStorageToken === $currentUser->access_token) {
            // Access tokens match, user is authenticated
            return $this->asJson(['authenticated' => true, 'user' => $currentUser]);
        } else {
            // Access tokens don't match, user is not authenticated
            return $this->asJson(['authenticated' => false]);
        }
    }
}
