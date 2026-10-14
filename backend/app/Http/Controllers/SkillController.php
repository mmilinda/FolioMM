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
        $skillsData = $request->input('skills', $request->all());

        if (is_array($skillsData)) {
            Skill::query()->delete();

            foreach ($skillsData as $index => $item) {
                if (!is_array($item)) continue;

                Skill::create([
                    'category' => $item['category'] ?? '',
                    'category_en' => $item['categoryEn'] ?? $item['category_en'] ?? null,
                    'icon_name' => $item['iconName'] ?? $item['icon_name'] ?? 'Cpu',
                    'skills' => $item['skills'] ?? [],
                    'order' => $index,
                ]);
            }
        }

        return response()->json(Skill::orderBy('order', 'asc')->get());
    }
}
