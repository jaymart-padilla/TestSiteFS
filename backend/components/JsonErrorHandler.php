<?php

namespace app\components;

use Yii;
use yii\web\HttpException;
use yii\web\Response;

class JsonErrorHandler extends \yii\web\ErrorHandler
{
  /**
   * Renders the exception.
   * @param \Exception|\Error $exception the exception or error to be rendered.
   */
  protected function renderException($exception)
  {
    $response = Yii::$app->getResponse();
    $response->format = Response::FORMAT_JSON;

    if ($exception instanceof HttpException) {
      $response->statusCode = $exception->statusCode;
    } else {
      $response->statusCode = 500;
    }

    $response->data = [
      'error' => $exception->getMessage(),
    ];

    $response->send();
  }
}
