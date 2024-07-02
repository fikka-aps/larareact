<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramQuestionAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['program_question_id', 'program_answer_id', 'answer'];
}
