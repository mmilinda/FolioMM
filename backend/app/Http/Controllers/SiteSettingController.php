<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function show()
    {
        $setting = SiteSetting::where('key', 'section_visibility')->first();
        
        $defaultVisibility = [
            'hero'     => true,
            'stats'    => true,
            'about'    => true,
            'services' => true,
            'projects' => true,
            'impact'   => true,
            'timeline' => true,
            'booking'  => true,
            'blog'     => true,
        ];

        return response()->json([
            'sectionVisibility' => $setting ? array_merge($defaultVisibility, $setting->value ?? []) : $defaultVisibility,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'sectionVisibility' => 'required|array',
        ]);

        $setting = SiteSetting::updateOrCreate(
            ['key' => 'section_visibility'],
            ['value' => $request->sectionVisibility]
        );

        return response()->json([
            'message' => 'Visibilité des sections mise à jour',
            'sectionVisibility' => $setting->value,
        ]);
    }
}
