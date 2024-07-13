<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramQuestionAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['program_question_id', 'program_answer_id', 'answer'];

    public function programQuestion()
    {
        return $this->belongsTo(ProgramQuestion::class, 'program_question_id');
    }

    public function programAnswer()
    {
        return $this->belongsTo(ProgramAnswer::class, 'program_answer_id');
    }
}
