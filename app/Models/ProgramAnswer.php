<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramAnswer extends Model
{
    use HasFactory;

    

    protected $fillable = ['program_id', 'user_id', 'status'];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
     // Define the relationship to the User model
     public function user()
     {
         return $this->belongsTo(User::class);
     }
}
