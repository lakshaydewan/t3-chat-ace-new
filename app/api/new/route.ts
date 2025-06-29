import { createNewMessage } from "@/app/actions/actions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { message, chatId } = body;
    
    if (!body.message || !body.chatId) {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
    }

    try {
        const chats = await createNewMessage(message, chatId);
        console.log('Chats after creation:', chats);
        return new Response(JSON.stringify(chats), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create chat' }), { status: 500 });
    }
}