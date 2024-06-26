<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('program_question_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\ProgramQuestion::class, 'program_question_id');
            $table->foreignIdFor(\App\Models\ProgramAnswer::class, 'program_answer_id');
            $table->text('answer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_question_answers');
    }
};
