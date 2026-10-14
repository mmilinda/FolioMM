<?php

namespace App\Http\Controllers;

use App\Models\Stat;
use Illuminate\Http\Request;

class StatController extends Controller
{
    public function index()
    {
        return response()->json(Stat::orderBy('order', 'asc')->get());
    }

    public function sync(Request $request)
    {
        $statsData = $request->input('stats', $request->all());

        if (is_array($statsData)) {
            Stat::query()->delete();

            foreach ($statsData as $index => $item) {
                if (!is_array($item)) continue;

                Stat::create([
                    'stat_id'  => $item['id'] ?? $item['stat_id'] ?? ('stat-' . ($index + 1)),
                    'value'    => $item['value'] ?? '0',
                    'label'    => $item['label'] ?? '',
                    'label_en' => $item['labelEn'] ?? $item['label_en'] ?? null,
                    'desc'     => $item['desc'] ?? '',
                    'desc_en'  => $item['descEn'] ?? $item['desc_en'] ?? null,
                    'order'    => $index,
                ]);
            }
        }

        return response()->json(Stat::orderBy('order', 'asc')->get());
    }
}
