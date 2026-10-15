<?php

namespace App\Http\Controllers;


use App\Models\Admin;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;



class AuthController extends Controller
{


    public function login(Request $request)
    {
        // Si la base Neon est fraîchement migrée et vide, initialiser le premier admin et le seed de base
        if (Admin::count() === 0 && $request->email === 'mmilinda00@gmail.com') {
            Admin::create([
                'name' => 'Milinda MENDY',
                'email' => 'mmilinda00@gmail.com',
                'password' => Hash::make('admin123'),
            ]);
            try {
                \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
            } catch (\Throwable $e) {
                // Seed déjà amorcé ou partiellement exécuté
            }
        }

        $admin = Admin::where('email', $request->email)->first();



if(
!$admin ||
!Hash::check(
$request->password,
$admin->password
)
)

{

return response()->json([

"message"=>"Identifiants invalides"

],401);


}



$token=$admin->createToken(

'portfolio-token'

)->plainTextToken;



return response()->json([

"token"=>$token,

"admin"=>$admin

]);


}



    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->tokens()->delete();
        }

        return response()->json([
            "message" => "Déconnecté"
        ]);
    }

    /**
     * Mettre à jour les accès administrateur (nom, email, mot de passe).
     */
    public function updateCredentials(Request $request)
    {
        $admin = $request->user() ?: Admin::first();

        if (!$admin) {
            return response()->json([
                "message" => "Compte administrateur introuvable."
            ], 404);
        }

        $request->validate([
            'email' => 'sometimes|nullable|email',
            'name' => 'sometimes|nullable|string|max:255',
            'password' => 'sometimes|nullable|string|min:6',
            'current_password' => 'sometimes|nullable|string',
        ]);

        // Mise à jour du mot de passe
        if ($request->filled('password')) {
            if ($request->filled('current_password')) {
                if (!Hash::check($request->current_password, $admin->password)) {
                    return response()->json([
                        "message" => "L'ancien mot de passe saisi est incorrect."
                    ], 422);
                }
            }
            $admin->password = Hash::make($request->password);
        }

        // Mise à jour de l'email
        if ($request->filled('email')) {
            $admin->email = strtolower(trim($request->email));
        }

        // Mise à jour du nom
        if ($request->filled('name')) {
            $admin->name = trim($request->name);
        }

        $admin->save();

        return response()->json([
            "message" => "Identifiants d'accès mis à jour avec succès !",
            "admin" => [
                "id" => $admin->id,
                "name" => $admin->name,
                "email" => $admin->email,
            ]
        ]);
    }
}