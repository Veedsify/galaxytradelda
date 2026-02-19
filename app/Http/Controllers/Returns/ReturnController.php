<?php

namespace App\Http\Controllers\Returns;

use App\Http\Controllers\Controller;
use App\Models\ReturnRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReturnController extends Controller
{
    public function index(Request $request): Response
    {
        $returnRequests = ReturnRequest::query()
            ->where('user_id', $request->user()->id)
            ->with('order')
            ->latest()
            ->paginate(10);

        return Inertia::render('returns/index', [
            'returnRequests' => $returnRequests,
        ]);
    }

    public function show(Request $request, ReturnRequest $returnRequest): Response
    {
        abort_unless($returnRequest->user_id === $request->user()->id, 403);

        $returnRequest->load('order.items');

        return Inertia::render('returns/show', [
            'returnRequest' => $returnRequest,
        ]);
    }
}
