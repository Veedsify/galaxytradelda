<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $subject ?? config('app.name') }}</title>
    <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #f4f6fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; }
        a { color: #1a2171; }
    </style>
</head>
<body style="background-color:#f4f6fb;margin:0;padding:0;">

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6fb;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- Header -->
    <tr>
        <td style="background-color:#1a2171;border-radius:12px 12px 0 0;padding:28px 40px;text-align:center;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="text-align:center;">
                        <span style="font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                            Galaxy<span style="color:#f5c518;">Trade</span> LDA
                        </span>
                        <p style="color:rgba(255,255,255,0.7);font-size:12px;margin-top:4px;letter-spacing:0.5px;">{{ $subject ?? 'Notification' }}</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Body -->
    <tr>
        <td style="background-color:#ffffff;padding:40px;">
            {{ $slot }}
        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background-color:#f8f9ff;border-top:1px solid #e8ebf7;border-radius:0 0 12px 12px;padding:24px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="text-align:center;">
                        <p style="font-size:12px;color:#888;margin-bottom:6px;">
                            <strong style="color:#1a2171;">Galaxy Trade LDA</strong>
                        </p>
                        <p style="font-size:11px;color:#aaa;">2. OSB Kocadere Sk No:7, 42002 Selçuklu, Konya, Turkey</p>
                        <p style="font-size:11px;color:#aaa;margin-top:2px;">
                            <a href="mailto:info@galaxytradelda.com" style="color:#1a2171;text-decoration:none;">info@galaxytradelda.com</a>
                            &nbsp;·&nbsp;
                            <a href="https://wa.me/351963978321" style="color:#1a2171;text-decoration:none;">WhatsApp</a>
                        </p>
                        <p style="font-size:10px;color:#ccc;margin-top:12px;">
                            © {{ date('Y') }} Galaxy Trade LDA. All rights reserved.
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

</table>
</td></tr>
</table>

</body>
</html>
