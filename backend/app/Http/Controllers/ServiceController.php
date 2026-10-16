<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::orderBy('order', 'asc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'desc'  => 'required|string',
        ]);

        $service = Service::create($request->all());
        return response()->json($service, 201);
    }

    public function update(Request $request, Service $service)
    {
        $service->update($request->all());
        return response()->json($service);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Service supprimé']);
    }

    public function sync(Request $request)
    {
        $servicesData = $request->input('services', $request->all());

        if (is_array($servicesData)) {
            try {
                Service::query()->delete();

                foreach ($servicesData as $index => $item) {
                    if (!is_array($item)) continue;

                    Service::create([
                        'title' => $item['title'] ?? '',
                        'title_en' => $item['titleEn'] ?? $item['title_en'] ?? null,
                        'desc' => $item['desc'] ?? '',
                        'desc_en' => $item['descEn'] ?? $item['desc_en'] ?? null,
                        'icon_name' => $item['iconName'] ?? $item['icon_name'] ?? 'Code2',
                        'tags' => $item['tags'] ?? [],
                        'glow' => $item['glow'] ?? '#38bdf8',
                        'gradient' => $item['gradient'] ?? 'from-blue-500/20 to-cyan-500/20',
                        'hidden' => filter_var($item['hidden'] ?? false, FILTER_VALIDATE_BOOLEAN) ? 1 : 0,
                        'order' => $index,
                    ]);
                }
            } catch (\Throwable $e) {
                return response()->json([
                    'error' => $e->getMessage(),
                    'trace' => $e->getFile() . ':' . $e->getLine()
                ], 500);
            }
        }

        return response()->json(Service::orderBy('order', 'asc')->get());
    }
}
