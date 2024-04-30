<?php

namespace app\controllers;

use app\models\Blog;
use app\models\User;
use Yii;
use yii\web\BadRequestHttpException;
use yii\web\UploadedFile;

class BlogController extends \yii\web\Controller
{
    public function actionIndex($page = 1)
    {
        $LIMIT = 4;

        $blogs = Blog::find()
            ->select(['id', 'user_id', 'title', 'content', 'thumbnail', 'created_at', 'updated_at'])
            ->orderBy(['created_at' => SORT_DESC])
            ->offset(($page - 1) * $LIMIT)
            ->limit($LIMIT)
            ->all();

        $normalizedBlogs = [];

        foreach ($blogs as $blog) {
            $normalizedBlogs[] = [
                'id' => $blog->id,
                'author' => User::findOne($blog->user_id)->username,
                'title' => $blog->title,
                'content' => $blog->getMarkdown($blog->content),
                'thumbnail' => $blog->thumbnail,
                'created_at' => Yii::$app->formatter->asDatetime($blog->created_at),
                'updated_at' => Yii::$app->formatter->asDatetime($blog->updated_at),
            ];
        }

        $totalBlogs = Blog::find()->count();

        $totalPages = ceil($totalBlogs / $LIMIT);

        $pagination = [
            'total_pages' => $totalPages,
            'current_page' => $page,
            'next_page' => $page < $totalPages ? $page + 1 : null,
            'prev_page' => $page > 1 ? $page - 1 : null,
        ];

        return $this->asJson([
            'blogs' => $normalizedBlogs,
            'pagination' => $pagination,
        ]);
    }


    public function actionView($id)
    {
        $model = Blog::findOne($id);

        if ($model === null) {
            throw new BadRequestHttpException('Blog not found');
        }

        return $this->asJson([
            'id' => $model->id,
            'author' => User::findOne($model->user_id)->username,
            'title' => $model->title,
            'content' => $model->getMarkdown($model->content),
            'thumbnail' => $model->thumbnail,
            'created_at' => Yii::$app->formatter->asDatetime($model->created_at),
            'updated_at' => Yii::$app->formatter->asDatetime($model->updated_at),
        ]);
    }

    public function actionCreate()
    {
        $userId = Yii::$app->user->id;
        $title = Yii::$app->request->post('title');
        $content = Yii::$app->request->post('content');

        $model = new Blog();
        $model->user_id = $userId;
        $model->title = $title;
        $model->content = $content;

        $model->thumbnail_file = UploadedFile::getInstanceByName('thumbnail');

        if (Yii::$app->request->isPost && $model->save()) {
            return $this->asJson([
                'id' => $model->id,
                'message' => 'Blog created successfully',
            ]);
        } else {
            if ($model->hasErrors()) {
                throw new BadRequestHttpException(json_encode($model->getErrors()));
            } else {
                throw new BadRequestHttpException('Failed to create blog');
            }
        }
    }

    public function actionUpdate($id)
    {
        $userId = Yii::$app->user->id;

        $title = Yii::$app->request->post('title');
        $content = Yii::$app->request->post('content');

        $model = Blog::findOne($id);

        if ($model === null) {
            throw new BadRequestHttpException('Blog not found');
        }

        // Check if the user is the owner of the blog or if the user is the admin 
        if ($model->user_id !== $userId && Yii::$app->user->identity->privilege !== 'admin') {
            throw new BadRequestHttpException('You are not allowed to update this blog');
        }

        $model->title = $title;
        $model->content = $content;

        $model->thumbnail_file = UploadedFile::getInstanceByName('thumbnail');

        if (Yii::$app->request->isPost && $model->save()) {
            return $this->asJson([
                'message' => 'Blog updated successfully',
            ]);
        } else {
            if ($model->hasErrors()) {
                throw new BadRequestHttpException(json_encode($model->getErrors()));
            } else {
                throw new BadRequestHttpException('Failed to update blog');
            }
        }
    }

    public function actionDelete($id)
    {
        $userId = Yii::$app->user->id;

        $model = Blog::findOne($id);

        if ($model === null) {
            throw new BadRequestHttpException('Blog not found');
        }

        // Check if the user is the owner of the blog or if the user is the admin 
        if ($model->user_id !== $userId && Yii::$app->user->identity->privilege !== 'admin') {
            throw new BadRequestHttpException('You are not allowed to delete this blog');
        }

        if ($model->delete()) {
            return $this->asJson([
                'message' => 'Blog deleted successfully',
            ]);
        } else {
            throw new BadRequestHttpException('Failed to delete blog');
        }
    }
}
