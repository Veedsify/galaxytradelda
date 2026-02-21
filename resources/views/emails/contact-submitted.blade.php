<x-emails.layout subject="New Contact Form Submission">
    <!-- Greeting -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
            <td style="background:linear-gradient(135deg,#f5c518,#e8b000);border-radius:8px;padding:16px 20px;">
                <p style="font-size:14px;font-weight:700;color:#1a2171;margin:0;">📬 New Contact Form Submission</p>
                <p style="font-size:12px;color:#333;margin-top:4px;">Someone reached out via the Galaxy Trade LDA website.</p>
            </td>
        </tr>
    </table>

    <!-- Details -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8ebf7;border-radius:8px;overflow:hidden;margin-bottom:24px;">
        <tr style="background-color:#f8f9ff;">
            <td colspan="2" style="padding:12px 20px;border-bottom:1px solid #e8ebf7;">
                <p style="font-size:12px;font-weight:700;color:#1a2171;text-transform:uppercase;letter-spacing:0.5px;margin:0;">Sender Details</p>
            </td>
        </tr>
        <tr>
            <td style="padding:12px 20px;width:120px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Name</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">{{ $submission->name }}</td>
        </tr>
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Email</td>
            <td style="padding:12px 20px;font-size:13px;border-bottom:1px solid #f0f0f0;">
                <a href="mailto:{{ $submission->email }}" style="color:#1a2171;text-decoration:none;">{{ $submission->email }}</a>
            </td>
        </tr>
        @if($submission->subject)
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;border-bottom:1px solid #f0f0f0;">Subject</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;border-bottom:1px solid #f0f0f0;">{{ $submission->subject }}</td>
        </tr>
        @endif
        <tr>
            <td style="padding:12px 20px;color:#666;font-size:13px;font-weight:600;vertical-align:top;">Received</td>
            <td style="padding:12px 20px;font-size:13px;color:#333;">{{ $submission->created_at->format('M j, Y \a\t g:i A') }}</td>
        </tr>
    </table>

    <!-- Message -->
    <p style="font-size:12px;font-weight:700;color:#1a2171;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Message</p>
    <div style="background-color:#f8f9ff;border-left:4px solid #f5c518;border-radius:0 8px 8px 0;padding:16px 20px;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">{{ $submission->message }}</div>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
        <tr>
            <td style="text-align:center;">
                <a href="{{ config('app.url') }}/admin/contacts"
                   style="display:inline-block;background-color:#1a2171;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 28px;border-radius:8px;">
                    View in Dashboard
                </a>
            </td>
        </tr>
    </table>
</x-emails.layout>
