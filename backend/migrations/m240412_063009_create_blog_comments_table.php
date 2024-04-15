<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%blog_comments}}`.
 */
class m240412_063009_create_blog_comments_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%blog_comments}}', [
            'id' => $this->primaryKey(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%blog_comments}}');
    }
}
