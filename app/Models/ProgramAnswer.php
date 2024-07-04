<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramAnswer extends Model
{
    use HasFactory;

    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $fillable = ['program_id', 'user_id', 'start_date', 'end_date'];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
