<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%contact_form_submissions}}`.
 */
class m240412_062825_create_contact_form_submissions_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%contact_form_submissions}}', [
            'id' => $this->primaryKey(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%contact_form_submissions}}');
    }
}
