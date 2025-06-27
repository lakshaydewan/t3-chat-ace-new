import React, { useEffect, useRef } from 'react'
import { Chat } from '@/lib/generated/prisma'
import { useParams, useRouter } from 'next/navigation'
import { Edit, XIcon } from 'lucide-react';
import { deleteChat, renameChat } from '@/app/actions/actions';
import { useChatStore } from '@/store/chatStore';

const ChatCard = ({ chat }: { chat: Chat }) => {

  const store = useChatStore();
  const router = useRouter();
  const {chatId} = useParams();
  const [editState, setEditState] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(chat.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editState) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editState])

  if (editState) {
    return <input
      ref={inputRef}
      defaultValue={chat.title}
      onBlur={async () => {
        // update chat in zustand store
        store.renameChat(chat.id, newTitle)
        setEditState(false)
        // update chat in db
        await renameChat(chat.id, newTitle)
      }}
      onKeyDown={async (e) => {
        if (e.key === "Enter") {
          // update chat in zustand store
          store.renameChat(chat.id, newTitle)
          setEditState(false)
          // update chat in db
          await renameChat(chat.id, newTitle)
        }
      }}
      onChange={(e: any) => setNewTitle(e.target.value)}
      className='font-sans w-full px-2 py-2 focus:outline-none ring-0 rounded-md overflow-hidden relative group text-[#b7387d] cursor-pointer my-1 hover:bg-white font-light text-sm'>
    </input>
  }

  return (
    <div onClick={() => {
      router.push(`/chat/${chat.id}`)
    }} className={`font-sans px-2 py-2 rounded-md overflow-hidden ${chatId === chat.id && 'bg-white'} relative group text-[#b7387d] cursor-pointer my-1 hover:bg-white font-light text-sm`}>
      {chat.title}
      <span className='absolute pr-1 rounded-md top-0 flex justify-center items-center gap-0.5 -right-[60px] group-hover:right-0 h-full w-[60px] bg-transparent transition-all duration-200 ease-out'>
        <span
          onClick={async (e) => {
            e.stopPropagation()
            console.log("EDITING CHAT", chat.id)
            setEditState(true)
            // update chat in zustand store
            // store.renameChat(chat.id, chat.title)
            // // update chat in db
            // await renameChat(chat.id, chat.title)
          }}
          className='p-1.5 z-30 cursor-pointer rounded-md hover:bg-[#f6e4f2] transition-all duration-300 ease-out flex justify-center items-center'>
          <Edit className='size-4 rounded text-[#b7387d]' />
        </span>
        <span
          onClick={async (e) => {
            e.stopPropagation()
            // delete chat from zustand store
            store.deleteChat(chat.id)
            // delete chat from db
            await deleteChat(chat.id)
            // check if deleted chat is active chat
            if (chatId === chat.id) {
              if (store.chats.length === 1) {
                router.push('/')
                return
              }
              const latestChat = store.chats[store.chats.length - 1]
              if (latestChat) {
                router.push(`/chat/${latestChat.id}`)
              }
            }
          }}
          className='p-1.5 z-30 cursor-pointer rounded-md hover:bg-[#f6e4f2] transition-all duration-300 ease-out flex justify-center items-center'>
          <XIcon className='size-4 rounded text-[#b7387d]' />
        </span>
      </span>
    </div>
  )
}

export default ChatCard