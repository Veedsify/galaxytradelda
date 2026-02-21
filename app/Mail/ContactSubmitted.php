<?php

namespace App\Mail;

use App\Models\ContactSubmission;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public ContactSubmission $submission) {}

    public function envelope(): Envelope
    {
        $subject = $this->submission?->subject ?? 'General Inquiry';
        $name = $this->submission?->name;

        return new Envelope(
            subject: "New Contact: {$subject} – {$name}",
            from: new Address(config('mail.from.address'), config('app.name') . ' Contact Form'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-submitted',
        );
    }
}
