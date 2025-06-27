import { Chat } from '@/lib/generated/prisma';
import { create } from 'zustand';

interface ChatStore {
    chats: Chat[];
    activeChatId: string;
    setActiveChatId: (id: string) => void;
    setChats: (chats: Chat[]) => void;
    addChat: (chat: Chat) => void;
    renameChat: (id: string, title: string) => void;
    deleteChat: (id: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    chats: [],
    activeChatId: '',
    setActiveChatId: (id: string) => set({ activeChatId: id }),
    setChats: (chats: Chat[]) => set({ chats }),
    addChat: (chat: Chat) => {
        // get current state of chats
        const currentChats = useChatStore.getState().chats
        // add new chat to the state
        set({ chats: [...currentChats, chat] })
    },
    renameChat(id: string, title: string) {
        // get current state of chats
        const currentChats = useChatStore.getState().chats
        // update chat in the state
        set({ chats: currentChats.map((chat) => {
            if (chat.id === id) {
                return {
                    ...chat,
                    title,
                }
            }
            return chat
        }) })
    },
    deleteChat(id: string) {
        // get current state of chats
        const currentChats = useChatStore.getState().chats
        // remove chat from the state
        set({ chats: currentChats.filter((chat) => chat.id !== id) })
    },
}));