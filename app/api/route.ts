import { NextResponse } from 'next/server';
import { createNewChat } from '../actions/actions';

export async function POST(req: NextResponse) {
    const body = await req.json();
    
    if (!body || !body.content || !body.role) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.log('Creating new chat with body:', body);

    try {
        const chats = await createNewChat(body);
        return NextResponse.json(chats);
    } catch (error) {
        NextResponse.json({ error: 'Failed to create chat' }, { status: 500 });
    }
}