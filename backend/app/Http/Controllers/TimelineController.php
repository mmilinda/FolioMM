<?php

namespace App\Http\Controllers;

use App\Models\Timeline;
use Illuminate\Http\Request;

class TimelineController extends Controller
{
    public function index()
    {
        return response()->json(Timeline::orderBy('order', 'asc')->get());
    }

    public function sync(Request $request)
    {
        $request->validate([
            'timeline' => 'required|array',
        ]);

        Timeline::query()->delete();

        foreach ($request->timeline as $index => $item) {
            Timeline::create([
                'year' => $item['year'],
                'title' => $item['title'],
                'company' => $item['company'],
                'description' => $item['description'] ?? '',
                'tags' => $item['tags'] ?? [],
                'type' => $item['type'] ?? 'work',
                'order' => $index,
            ]);
        }

        return response()->json(Timeline::orderBy('order', 'asc')->get());
    }
}
