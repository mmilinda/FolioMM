<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::orderBy('order', 'asc')->get());
    }

    public function sync(Request $request)
    {
        $request->validate([
            'skills' => 'required|array',
        ]);

        Skill::query()->delete();

        foreach ($request->skills as $index => $item) {
            Skill::create([
                'category' => $item['category'],
                'icon_name' => $item['iconName'] ?? $item['icon_name'] ?? 'Cpu',
                'skills' => $item['skills'] ?? [],
                'order' => $index,
            ]);
        }

        return response()->json(Skill::orderBy('order', 'asc')->get());
    }
}
