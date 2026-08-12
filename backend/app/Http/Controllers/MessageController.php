<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Public contact submission
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'name'    => $request->name,
            'email'   => $request->email,
            'subject' => $request->subject ?? 'Nouveau message portfolio',
            'message' => $request->message,
            'read'    => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès !',
            'data'    => $message,
        ], 201);
    }

    /**
     * Admin view all messages
     */
    public function index()
    {
        return response()->json(Message::latest()->get());
    }

    /**
     * Mark message as read
     */
    public function markAsRead(Message $message)
    {
        $message->update(['read' => true]);
        return response()->json($message);
    }

    /**
     * Delete message
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(['message' => 'Message supprimé']);
    }
}
