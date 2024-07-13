<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramQuestionAnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'program_question_id' => $this->program_question_id,
            'program_answer_id' => $this->program_answer_id,
            'answer' => $this->answer,
            'question' => new ProgramQuestionResource($this->whenLoaded('programQuestion')),
        ];
    }
}
