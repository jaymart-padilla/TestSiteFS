<?php

namespace app\fixtures;

use yii\test\ActiveFixture;

class BlogFixture extends ActiveFixture
{
  public $modelClass = 'app\models\Blog';

  public $dataFile = '@tests/unit/fixtures/data/blog.php';
}
