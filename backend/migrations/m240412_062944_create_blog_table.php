<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%blog}}`.
 */
class m240412_062944_create_blog_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%blog}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'title' => $this->string()->notNull(),
            'thumbnail' => $this->string()->notNull(),
            'content' => $this->text()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-blog-user_id',
            '{{%blog}}',
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
        $this->dropForeignKey('fk-blog-user_id', '{{%blog}}');
        $this->dropTable('{{%blog}}');
    }
}
