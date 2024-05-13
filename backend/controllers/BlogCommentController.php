<?php

namespace app\controllers;

use app\models\BlogComments;
use Yii;
use yii\web\BadRequestHttpException;

class BlogCommentController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionCreate()
    {
        $userId = Yii::$app->user->id;
        $comment = Yii::$app->request->post('comment');
        $blogId = Yii::$app->request->post('blog_id');

        $model = new BlogComments();
        $model->user_id = $userId;
        $model->blog_id = $blogId;
        $model->content = $comment;

        // prohibit comment submission if the user is not logged in
        if (Yii::$app->user->isGuest) {
            throw new BadRequestHttpException('You must be logged in to submit a comment');
        }

        // if the user is an admin, approve the comment automatically
        if (Yii::$app->user->identity->privilege === 'admin') {
            $model->status = 'approved';
        }

        if (Yii::$app->request->isPost && $model->save()) {
            return $this->asJson([
                'message' => 'Comment submitted successfully',
            ]);
        } else {
            if ($model->hasErrors()) {
                throw new BadRequestHttpException(json_encode($model->getErrors()));
            } else {
                throw new BadRequestHttpException('Failed to submit comment');
            }
        }
    }

    // update comment status
    public function actionUpdateStatus($id)
    {
        $status = Yii::$app->request->post('status');

        $model = BlogComments::findOne($id);
        $model->status = $status;

        if ($model->save()) {
            return $this->asJson([
                'status' => $model->status,
                'message' => 'Comment status updated successfully',
            ]);
        } else {
            if ($model->hasErrors()) {
                throw new BadRequestHttpException(json_encode($model->getErrors()));
            } else {
                throw new BadRequestHttpException('Failed to update comment status');
            }
        }
    }

    public function actionDelete($id)
    {
        $model = BlogComments::findOne($id);

        // Check if the user is the admin 
        if (Yii::$app->user->identity->privilege !== 'admin') {
            throw new BadRequestHttpException('You are not allowed to delete this blog');
        }

        if ($model->delete()) {
            return $this->asJson([
                'message' => 'Comment deleted successfully',
            ]);
        } else {
            throw new BadRequestHttpException('Failed to delete comment');
        }
    }
}
