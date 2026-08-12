<?php

namespace App\Http\Controllers;

use App\Models\ImpactMetric;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class ImpactController extends Controller
{
    public function index()
    {
        return response()->json([
            'metrics' => ImpactMetric::orderBy('order', 'asc')->get(),
            'testimonials' => Testimonial::orderBy('order', 'asc')->get(),
        ]);
    }

    public function sync(Request $request)
    {
        if ($request->has('metrics')) {
            ImpactMetric::query()->delete();
            foreach ($request->metrics as $index => $item) {
                ImpactMetric::create([
                    'number' => $item['number'],
                    'label'  => $item['label'],
                    'desc'   => $item['desc'] ?? '',
                    'order'  => $index,
                ]);
            }
        }

        if ($request->has('testimonials')) {
            Testimonial::query()->delete();
            foreach ($request->testimonials as $index => $item) {
                Testimonial::create([
                    'name'    => $item['name'],
                    'role'    => $item['role'],
                    'content' => $item['content'],
                    'avatar'  => $item['avatar'] ?? null,
                    'order'   => $index,
                ]);
            }
        }

        return response()->json([
            'metrics' => ImpactMetric::orderBy('order', 'asc')->get(),
            'testimonials' => Testimonial::orderBy('order', 'asc')->get(),
        ]);
    }
}
