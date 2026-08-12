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
        $request->validate([
            'services' => 'required|array',
        ]);

        Service::query()->delete();

        foreach ($request->services as $index => $item) {
            Service::create([
                'title' => $item['title'],
                'desc' => $item['desc'] ?? '',
                'icon_name' => $item['iconName'] ?? $item['icon_name'] ?? 'Code2',
                'tags' => $item['tags'] ?? [],
                'glow' => $item['glow'] ?? '#38bdf8',
                'gradient' => $item['gradient'] ?? 'from-blue-500/20 to-cyan-500/20',
                'hidden' => $item['hidden'] ?? false,
                'order' => $index,
            ]);
        }

        return response()->json(Service::orderBy('order', 'asc')->get());
    }
}
