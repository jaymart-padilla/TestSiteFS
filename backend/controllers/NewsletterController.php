<?php

namespace app\controllers;

use app\models\NewsletterSubscribers;
use app\models\User;
use yii\web\BadRequestHttpException;
use yii\web\Controller;

class NewsletterController extends Controller
{
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
            ],
        ];
    }

    // public function actionSubscribe()
    // {
    //     $request = \Yii::$app->request;
    //     $email = $request->post('email');
    //     $accessToken = $request->post('accessToken');

    //     if (!$email || !$accessToken) {
    //         throw new BadRequestHttpException('Failed to subscribe to our newsletter');
    //     }

    //     // find user of matching credentials
    //     $user = User::find()
    //         ->where(['email' => $email, 'access_token' => $accessToken])
    //         ->one();
    //     if (!$user) {
    //         throw new BadRequestHttpException('Failed to subscribe to our newsletter');
    //     }

    //     // make sure user hasn't subscribed already
    //     $hasNewsletterSubscription = NewsletterSubscribers::find()
    //         ->where(['user_id' => $user->id])
    //         ->exists();
    //     if ($hasNewsletterSubscription) {
    //         throw new BadRequestHttpException('You have already subscribed to our newsletter');
    //     }

    //     // subscribe user to newsletter
    //     $subscriber = new NewsletterSubscribers();
    //     $subscriber->user_id = $user->id;
    //     if ($subscriber->save()) {
    //         return $this->asJson([
    //             'message' => 'You have been subscribed to our newsletter',
    //         ]);
    //     } else {
    //         if ($subscriber->hasErrors()) {
    //             throw new BadRequestHttpException(json_encode($subscriber->getErrors()));
    //         } else {
    //             throw new BadRequestHttpException('Failed to subscribe to our newsletter');
    //         }
    //     }
    // }

    public function actionSubscribe()
    {
        $request = \Yii::$app->request;
        $email = $request->post('email');

        if (!$email) {
            throw new BadRequestHttpException('Failed to subscribe to our newsletter');
        }

        // make sure user hasn't subscribed already
        $hasNewsletterSubscription = NewsletterSubscribers::find()
            ->where(['email' => $email])
            ->exists();
        if ($hasNewsletterSubscription) {
            throw new BadRequestHttpException('You have already subscribed to our newsletter');
        }

        // subscribe user to newsletter
        $subscriber = new NewsletterSubscribers();
        $subscriber->email = $email;
        if ($subscriber->save()) {
            return $this->asJson([
                'message' => 'You have been subscribed to our newsletter!',
            ]);
        } else {
            if ($subscriber->hasErrors()) {
                throw new BadRequestHttpException(json_encode($subscriber->getErrors()));
            } else {
                throw new BadRequestHttpException('Failed to subscribe to our newsletter');
            }
        }
    }

    // public function actionUnsubscribe()
    // {
    //     $request = \Yii::$app->request;
    //     $email = $request->post('email');
    //     $accessToken = $request->post('accessToken');

    //     if (!$email || !$accessToken) {
    //         throw new BadRequestHttpException('Failed to unsubscribe from our newsletter');
    //     }

    //     // find user of matching credentials
    //     $user = User::find()
    //         ->where(['email' => $email, 'access_token' => $accessToken])
    //         ->one();
    //     if (!$user) {
    //         throw new BadRequestHttpException('Failed to unsubscribe from our newsletter');
    //     }

    //     // find and delete user's newsletter subscription
    //     $subscriber = NewsletterSubscribers::find()
    //         ->where(['user_id' => $user->id])
    //         ->one();
    //     if (!$subscriber) {
    //         throw new BadRequestHttpException('You are not subscribed to our newsletter');
    //     }

    //     if ($subscriber->delete()) {
    //         return $this->asJson([
    //             'message' => 'You have been unsubscribed from our newsletter',
    //         ]);
    //     } else {
    //         throw new BadRequestHttpException('Failed to unsubscribe from our newsletter');
    //     }
    // }
}
