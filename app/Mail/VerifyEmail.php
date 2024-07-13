<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;

    /**
     * Create a new message instance.
     * 
     * @param string $token
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    public function build()
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
        $verificationUrl = "{$frontendUrl}/verify-email/{$this->token}";
        return $this->view('emails.verify')
                ->with([
                    'verificationUrl' => $verificationUrl,
                ])
                ->subject('Verify Email');
    }
}
