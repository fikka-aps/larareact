<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'type', 'question', 'description', 'data', 'program_id'];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function questionAnswers()
    {
        return $this->hasMany(ProgramQuestionAnswer::class, 'program_question_id');
    }
}
