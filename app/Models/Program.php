<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Program extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['title', 'description', 'expire_date', 'image', 'user_id', 'status', 'created_at', 'updated_at'];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function questions()
    {
        return $this->hasMany(ProgramQuestion::class);
    }

    public function answers()
    {
        return $this->hasMany(ProgramAnswer::class);
    }

    public function questionAnswers()
    {
        return $this->hasManyThrough(
            ProgramQuestionAnswer::class,
            ProgramQuestion::class,
            'program_id', // Foreign key on ProgramQuestion table
            'program_question_id', // Foreign key on ProgramQuestionAnswer table
            'id', // Local key on Program table
            'id'  // Local key on ProgramQuestion table
        );
    }
}
