<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProgramAnswerResource;
use App\Http\Resources\ProgramResourceDashboard;
use App\Models\Program;
use App\Models\ProgramAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Total Number of Programs
        $total = Program::query()->count();

        // Latest Program
        $latest = Program::query()->where('user_id', $user->id)->latest('created_at')->first();

        // Total Number of answers
        $totalAnswers = ProgramAnswer::query()
            ->join('programs', 'program_answers.program_id', '=', 'programs.id')
            ->where('programs.user_id', $user->id)
            ->count();

        // Latest 5 answer
        $latestAnswers = ProgramAnswer::query()
            ->join('programs', 'program_answers.program_id', '=', 'programs.id')
            ->where('programs.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('program_answers.*');

        return [
            'totalPrograms' => $total,
            'latestProgram' => $latest ? new ProgramResourceDashboard($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => ProgramAnswerResource::collection($latestAnswers)
        ];
    }
}
