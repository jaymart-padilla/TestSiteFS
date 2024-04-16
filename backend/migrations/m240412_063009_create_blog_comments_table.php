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
            'blog_id' => $this->integer()->notNull(),
            'user_id' => $this->integer()->notNull(),
            'status' => $this->string()->notNull()->defaultValue('pending'),
            'content' => $this->text()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-blog_comments-blog_id',
            '{{%blog_comments}}',
            'blog_id',
            '{{%blog}}',
            'id',
        );

        $this->addForeignKey(
            'fk-blog_comments-user_id',
            '{{%blog_comments}}',
            'user_id',
            '{{%user}}',
            'id',
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-blog_comments-blog_id', '{{%blog_comments}}');
        $this->dropForeignKey('fk-blog_comments-user_id', '{{%blog_comments}}');

        $this->dropTable('{{%blog_comments}}');
    }
}
