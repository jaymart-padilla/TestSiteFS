<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\helpers\FileHelper;
use yii\helpers\HtmlPurifier;
use yii\helpers\Inflector;
use yii\web\UploadedFile;

/**
 * This is the model class for table "{{%blog}}".
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $thumbnail
 * @property string $content
 * @property int $created_at
 * @property int $updated_at
 *
 * @property BlogComments[] $blogComments
 * @property User $user
 */
class Blog extends \yii\db\ActiveRecord
{
    /**
     * @var UploadedFile
     */
    public $thumbnail_file;

    protected $DEFAULT_THUMBNAIL_PATH = 'images/default/thumbnail-default.png';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%blog}}';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'title', 'content'], 'required'],
            [['user_id', 'created_at', 'updated_at'], 'integer'],
            [['content', 'thumbnail'], 'string'],
            [['title'], 'string', 'max' => 255],
            [['thumbnail_file'], 'file'],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'title' => 'Title',
            'content' => 'Content',
            'thumbnail' => 'Thumbnail',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[BlogComments]].
     *
     * @return \yii\db\ActiveQuery|\app\models\query\BlogCommentsQuery
     */
    public function getBlogComments()
    {
        return $this->hasMany(BlogComments::class, ['blog_id' => 'id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery|\app\models\query\UserQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return \app\models\query\BlogQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\query\BlogQuery(get_called_class());
    }

    public function save($runValidation = true, $attributeNames = null)
    {
        if ($this->isNewRecord || $this->thumbnail_file instanceof UploadedFile) {
            // If it's a new record or there's a new thumbnail file uploaded

            // Delete old thumbnail if it exists
            if (!$this->isNewRecord && $this->thumbnail) {
                $this->deleteThumbnail($this->thumbnail);
            }

            // Save new thumbnail
            $this->thumbnail = $this->uploadThumbnail();
        }

        // save markdown if new record and content is updated, delete it if content is new/updated
        if (
            !$this->isNewRecord && $this->isAttributeChanged('content')
            && $this->content
        ) {
            $this->deleteMarkdownFile($this->getOldAttribute('content'));
        }

        if ($this->content) {
            $markdownPath = $this->saveMarkdownFile($this->content);
            $this->content = $markdownPath;
        }

        // Save other attributes
        return parent::save($runValidation, $attributeNames);
    }

    /**
     * Uploads the thumbnail file and returns the file path.
     *
     * @return string|null the file path of the uploaded thumbnail
     */
    protected function uploadThumbnail()
    {
        $uploadPath = 'images/thumbnail/';

        if ($this->thumbnail_file instanceof UploadedFile) {
            $uploadDir = Yii::getAlias('@webroot/' . $uploadPath);
            FileHelper::createDirectory($uploadDir);

            $fileName = Yii::$app->security->generateRandomString(16) . '.' . $this->thumbnail_file->extension;
            $filePath = $uploadDir . $fileName;

            if ($this->thumbnail_file->saveAs($filePath)) {
                return $uploadPath . $fileName;
            }
        } elseif (empty($this->thumbnail) && empty($this->thumbnail_file)) {
            // If thumbnail_file is empty and no thumbnail set, use default thumbnail
            return $this->DEFAULT_THUMBNAIL_PATH;
        }
        return null;
    }

    /**
     * Deletes the specified thumbnail file.
     *
     * @param string $thumbnail the file path of the thumbnail to be deleted
     * @return bool whether the deletion is successful
     */
    protected function deleteThumbnail($thumbnail)
    {
        $thumbnailPath = Yii::getAlias('@webroot' . '/' . $thumbnail);

        // delete if file exist and not the default thumbnail
        if ($thumbnail !== $this->DEFAULT_THUMBNAIL_PATH && file_exists($thumbnailPath) && unlink($thumbnailPath)) {
            return true;
        }
        return false;
    }

    /**
     * Saves the markdown content to a file.
     *
     * @param string $content the markdown content to be saved
     * @return string the file path of the saved markdown file
     */
    protected function saveMarkdownFile($content)
    {
        $uploadPath = 'md/';
        $uploadDir = Yii::getAlias('@webroot/' . $uploadPath);
        FileHelper::createDirectory($uploadDir);

        // $safeContent = HtmlPurifier::process($content); // Sanitize HTML content
        $fileName = Inflector::slug($this->title) . '__' . Yii::$app->security->generateRandomString(16) . '.md';
        $filePath = Yii::getAlias('@webroot/md/') . $fileName;
        file_put_contents($filePath, $content);
        return 'md/' . $fileName;
    }

    /**
     * Deletes the specified markdown file.
     *
     * @param string $content the file path of the markdown file to be deleted
     * @return bool whether the deletion is successful
     */
    protected function deleteMarkdownFile($content)
    {
        // check if the content exist and at the path 'md/'
        if ($content && strpos($content, 'md/') === 0) {
            $filePath = Yii::getAlias('@webroot/') . $content;
            if (file_exists($filePath)) {
                unlink($filePath);
                return true;
            }
        }
        return false;
    }


    public function getMarkdown($filename)
    {
        // Ensure the filename is safe to prevent directory traversal attacks
        $safeFilename = FileHelper::normalizePath($filename);

        // Build the path to the Markdown file
        $filePath = Yii::getAlias('@webroot/') . $safeFilename;

        // Check if the file exists
        if (file_exists($filePath)) {
            // Read the content of the Markdown file
            return file_get_contents($filePath);
        } else {
            return null;
        }
    }

    public function afterDelete()
    {
        parent::afterDelete();
        $this->deleteThumbnail($this->thumbnail);
        $this->deleteMarkdownFile($this->content);
    }
}
