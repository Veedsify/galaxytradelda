<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderStatusChanged extends Mailable
{
    use Queueable, SerializesModels;

    public string $statusColor;

    public function __construct(
        public Order $order,
        public string $oldStatus,
    ) {
        $this->statusColor = match ($order->status) {
            'processing' => '3b82f6',
            'shipped'    => '6366f1',
            'delivered'  => '22c55e',
            'cancelled'  => 'ef4444',
            default      => 'f5c518',
        };
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Your Order #{$this->order->order_number} is now: " . ucfirst($this->order->status),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order-status-changed',
        );
    }
}
