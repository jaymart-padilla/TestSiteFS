<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%newsletter_subscribers}}`.
 */
class m240416_013950_create_newsletter_subscribers_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%newsletter_subscribers}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-newsletter_subscribers-user_id',
            '{{%newsletter_subscribers}}',
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
        $this->dropForeignKey('fk-newsletter_subscribers-user_id', '{{%newsletter_subscribers}}');
        $this->dropTable('{{%newsletter_subscribers}}');
    }
}
