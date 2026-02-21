<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('code') – @yield('title') | {{ config('app.name') }}</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f6fb;
            color: #1b1b18;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        header {
            background-color: #1a2171;
            padding: 18px 32px;
        }
        header a {
            font-size: 22px;
            font-weight: 800;
            color: #ffffff;
            text-decoration: none;
            letter-spacing: -0.5px;
        }
        header a span { color: #f5c518; }
        main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 48px 24px;
        }
        .card {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 32px rgba(26,33,113,0.08);
            padding: 56px 48px;
            max-width: 540px;
            width: 100%;
            text-align: center;
        }
        .code {
            font-size: 96px;
            font-weight: 900;
            line-height: 1;
            background: linear-gradient(135deg, #1a2171, #3b4fd8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 4px;
        }
        .code span { color: #f5c518; -webkit-text-fill-color: #f5c518; }
        .title {
            font-size: 24px;
            font-weight: 700;
            color: #1a2171;
            margin-bottom: 12px;
        }
        .description {
            font-size: 15px;
            color: #6b7280;
            line-height: 1.7;
            margin-bottom: 36px;
        }
        .actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn-primary {
            display: inline-block;
            background-color: #1a2171;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            padding: 12px 28px;
            border-radius: 8px;
            transition: background-color 0.15s;
        }
        .btn-primary:hover { background-color: #141a5e; }
        .btn-secondary {
            display: inline-block;
            background-color: #f5c518;
            color: #1a2171;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
            padding: 12px 28px;
            border-radius: 8px;
            transition: opacity 0.15s;
        }
        .btn-secondary:hover { opacity: 0.85; }
        .icon {
            font-size: 56px;
            margin-bottom: 16px;
        }
        footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #9ca3af;
        }
    </style>
</head>
<body>
    <header>
        <a href="/">Galaxy<span>Trade</span> LDA</a>
    </header>

    <main>
        <div class="card">
            <div class="icon">@yield('icon')</div>
            <div class="code">@yield('code')</div>
            <h1 class="title">@yield('title')</h1>
            <p class="description">@yield('description')</p>
            <div class="actions">
                @yield('actions')
            </div>
        </div>
    </main>

    <footer>
        &copy; {{ date('Y') }} Galaxy Trade LDA &nbsp;·&nbsp; All rights reserved.
    </footer>
</body>
</html>
