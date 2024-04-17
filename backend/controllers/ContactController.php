<?php

namespace app\controllers;

use app\models\ContactFormSubmissions;
use Yii;
use yii\web\BadRequestHttpException;
use yii\web\Controller;

class ContactController extends Controller
{
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
            ],
        ];
    }

    public function actionContactFormSubmit()
    {
        $name = Yii::$app->request->post('name');
        $email = Yii::$app->request->post('email');
        $subject = Yii::$app->request->post('subject');
        $message = Yii::$app->request->post('message');

        $contactFormSubmission = new ContactFormSubmissions();
        $contactFormSubmission->name = $name;
        $contactFormSubmission->email = $email;
        $contactFormSubmission->subject = $subject;
        $contactFormSubmission->message = $message;

        // attempt save record
        if ($contactFormSubmission->save()) {
            return $this->asJson(['message' => "Contact submitted successfully."]);
        } else {
            if ($contactFormSubmission->hasErrors()) {
                throw new BadRequestHttpException(json_encode($contactFormSubmission->getErrors()));
            } else {
                throw new BadRequestHttpException('Failed to submit the message.');
            }
        }
    }
}
