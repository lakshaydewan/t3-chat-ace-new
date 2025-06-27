"use client"
import type React from "react"
import { useState, useRef, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import ChatCard from "@/components/chatButton"
import {
  Search,
  Settings,
  Moon,
  Sun,
  Sparkles,
  Compass,
  Code,
  GraduationCap,
  ArrowUp,
  Paperclip,
  ChevronDown,
  Menu,
  PanelLeft,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { signIn, useSession } from "next-auth/react"
import { createNewChat } from "@/app/actions/actions"
import { redirect, useRouter } from "next/navigation"
import { useChatStore } from "@/store/chatStore"
import { set } from "react-hook-form"

const sampleQuestions = [
  "How does AI work?",
  "Are black holes real?",
  'How many Rs are in the word "strawberry"?',
  "What is the meaning of life?",
]

const categories = [
  { name: "Create", icon: Sparkles },
  { name: "Explore", icon: Compass },
  { name: "Code", icon: Code },
  { name: "Learn", icon: GraduationCap },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

function Sidebar({ loadingState }: { loadingState: boolean }) {

  const { data } = useSession();
  console.log(data);
  const { chats } = useChatStore();

  return (
    <div className="h-full bg-[#f3e5f5] font-sans dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 flex flex-col border-r border-purple-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex relative items-center justify-center gap-2 mb-3">
        <div className="w-7 h-full flex justify-center items-center absolute top-0 left-1 text-[#ca0277] hover:bg-[#efbdeb] cursor-pointer rounded">
          <PanelLeft className="w-4 h-4 box-border" />
        </div>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 247.7 53" className="h-6 w-16 text-[#ca0277] box-border"><path fill="currentcolor" d="M205.6,50.3c1.9-1,3.5-2.2,4.7-3.6v4.4v0.4h0.4h7.7h0.4v-0.4V13.5v-0.4h-0.4h-7.7h-0.4v0.4v4.3
	c-1.2-1.4-2.8-2.6-4.6-3.5c-2.2-1.2-4.8-1.8-7.8-1.8c-3.3,0-6.3,0.8-9,2.5c-2.7,1.7-4.9,4-6.4,6.9l0,0c-1.6,3-2.4,6.4-2.4,10.2
	c0,3.8,0.8,7.3,2.4,10.3c1.6,3,3.7,5.4,6.4,7.1c2.7,1.7,5.7,2.6,8.9,2.6C200.6,52.1,203.3,51.5,205.6,50.3z M208.7,25.7l0.3,0.5
	c0.8,1.7,1.2,3.7,1.2,6c0,2.5-0.5,4.7-1.5,6.6c-1,1.9-2.4,3.3-4,4.2c-1.6,1-3.4,1.5-5.3,1.5c-1.9,0-3.6-0.5-5.3-1.5
	c-1.7-1-3-2.4-4-4.3c-1-1.9-1.5-4.1-1.5-6.6c0-2.5,0.5-4.7,1.5-6.5c1-1.8,2.3-3.2,4-4.1c1.6-1,3.4-1.4,5.3-1.4
	c1.9,0,3.7,0.5,5.3,1.4C206.4,22.5,207.7,23.9,208.7,25.7z"></path><path fill="currentcolor" d="M99.6,21.4L99.6,21.4l-0.3,0.5c-1.6,3-2.4,6.5-2.4,10.4s0.8,7.4,2.4,10.4c1.6,3,3.8,5.3,6.6,7
	c2.8,1.7,6,2.5,9.6,2.5c4.5,0,8.2-1.2,11.3-3.5c3-2.3,5.1-5.4,6.2-9.3l0.1-0.5h-0.5h-8.3H124l-0.1,0.3c-0.7,1.9-1.7,3.3-3.1,4.3
	c-1.4,0.9-3.1,1.4-5.3,1.4c-3,0-5.4-1.1-7.2-3.3l0,0c-1.8-2.2-2.7-5.3-2.7-9.3c0-4,0.9-7,2.7-9.2c1.8-2.2,4.2-3.2,7.2-3.2
	c2.2,0,3.9,0.5,5.3,1.5c1.4,1,2.4,2.4,3.1,4.2l0.1,0.3h0.3h8.3h0.5l-0.1-0.5c-1-4.1-3.1-7.3-6.1-9.5c-3-2.2-6.8-3.3-11.4-3.3
	c-3.6,0-6.8,0.8-9.6,2.5l0,0C103.2,16.4,101.1,18.6,99.6,21.4z"></path><g><polygon fill="currentcolor" points="237.8,13.2 237.8,3.9 229.1,3.9 229.1,13.2 224.8,13.2 224.8,20.5 229.1,20.5 229.1,52.1 230,51.2 
		230,51.2 232,49.2 237.8,43.2 237.8,20.5 246.8,20.5 246.8,13.2 	"></polygon><path fill="currentcolor" d="M71.7,3.4H51.5l-7.1,7.2h18.8"></path><path fill="currentcolor" d="M166.8,14.5l-0.1-0.1c-2.3-1.3-4.9-1.9-7.7-1.9c-2.4,0-4.6,0.5-6.7,1.3c-1.6,0.7-3,1.7-4.2,2.8V0.1l-8.6,8.8
		v42.7h8.6V30.1c0-3.2,0.8-5.7,2.4-7.3c1.6-1.7,3.7-2.5,6.4-2.5s4.8,0.8,6.4,2.5c1.6,1.7,2.3,4.2,2.3,7.4v21.4h8.5V29
		c0-3.5-0.6-6.4-1.9-8.9C170.8,17.6,169,15.7,166.8,14.5z"></path><path fill="currentcolor" d="M43,3.4H0v0.5l0,0v3.2v3.7h3.5l0,0h11.9v40.8H24V10.7h11.8L43,3.4z"></path></g><path fill="currentcolor" d="M71.9,25.4l-0.2-0.2h0c-2.2-2.3-5.3-3.7-9.1-4.2L73.4,9.8V3.4H54.8l-9.4,7.2h17.7L52.5,21.8v5.9h7
	c2.5,0,4.4,0.7,5.9,2.2c1.4,1.4,2.1,3.4,2.1,6.1c0,2.6-0.7,4.7-2.1,6.2c-1.4,1.5-3.4,2.2-5.9,2.2c-2.5,0-4.4-0.7-5.7-2
	c-1.4-1.4-2.1-3.1-2.3-5.2l0-0.5h-8.1l0,0.5c0.2,4.6,1.8,8.1,4.8,10.5c2.9,2.4,6.7,3.7,11.3,3.7c5,0,9-1.4,11.9-4.2
	c2.9-2.8,4.4-6.6,4.4-11.3C75.6,31.5,74.4,28,71.9,25.4z"></path><rect x="84.3" y="44.2" fill="currentcolor" width="6.9" height="6.9"></rect>
        </svg>
      </div>

      {/* New Chat Button */}
      <Button className="w-full mb-4 bg-[#a43e6b] hover:bg-[#a43e6b] text-white rounded-xl py-0 font-medium shadow-sm transition-all duration-200">
        New Chat
      </Button>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#d589b4] w-4 h-4" />
        <input
          placeholder="Search your threads..."
          className="w-full pl-10 pr-4 py-2.5 ring-0 tracking-wide outline-none bg-transparent placeholder:text-[#d589b4] dark:bg-gray-800/60 border-b border-b-[#efbdeb] dark:border-b-gray-600 text-gray-700 dark:text-gray-200 text-xs"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1">
        <span className="text-xs text-[#4f1754] font-sans font-semibold">Chats</span>
        {
          loadingState && <div className="animate-pulse bg-[#b7387d]/30 font-sans px-2 py-4 rounded-md my-2">
          </div>
        }
        {
          !loadingState && ((chats.length > 0) ? chats.map((chat) => {
            return (
              <div key={chat.id}>
                <ChatCard chat={chat} />
              </div>
            )
          }) :
            <div className="text-center text-sm font-sans px-2 py-2 rounded-md">
              No chats yet
            </div>)
        }
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-3 bg-white/40 dark:bg-gray-800/40 rounded-xl border border-purple-50 dark:border-gray-700">
        <Avatar className="w-10 h-10">
          {
            (
              <AvatarFallback className="bg-blue-500 text-white font-semibold text-sm">{
                data?.user?.email?.charAt(0).toUpperCase() || "-"
              }</AvatarFallback>
            )
          }
        </Avatar>
        <div>
          <div className="font-semibold text-gray-800 dark:text-white text-sm">{data?.user?.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Free</div>
        </div>
      </div>
    </div>
  )
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">
      <LoadingDots />
    </div>
  )
}

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState("Gemini 2.5 Flash")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { theme, setTheme } = useTheme()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter();

  //user session
  const { status } = useSession()
  const { setChats, chats } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (chats.length > 0) return
    setIsLoading(true)
    fetch("/api/chat")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.length > 0) {
          setChats(data)
          setIsLoading(false)
          return
        }
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    adjustTextareaHeight()
  }

  const handleSubmit = async (e: React.FormEvent) => {

    if (status === "loading") return

    if (status === "unauthenticated") {
      signIn()
      return
    }

    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    try {
      const chat = await createNewChat(userMessage)
      setChats([chat, ...chats])
      router.push(`/chat/${chat.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleQuestionClick = (question: string) => {
    setInput(question)
    textareaRef.current?.focus()
    // setTimeout(() => {
    //   const event = new Event("submit") as any
    //   handleSubmit(event)
    // }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#fdfbff] via-[#faf8ff] to-[#f8f4ff] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64">
        <Sidebar loadingState={isLoading} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar loadingState={isLoading} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 border-b border-purple-50 dark:border-gray-800">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-xl"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-xl"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 lg:px-8">
            {messages.length === 0 ? (
              <div className="h-full font-sans flex items-center justify-center">
                <div className="w-full lg:mb-16 max-w-3xl mx-auto">
                  {/* Welcome Message */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#77347b] dark:text-white mb-6 text-start">
                    How can I help you, Lakshay?
                  </h2>

                  {/* Category Buttons */}
                  <div className="flex flex-wrap justify-start gap-2 mb-5">
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <Button
                          key={category.name}
                          variant="outline"
                          className="bg-[#f6e4f2] border-[#efbdeb] hover:text-[#854688] text-[#854688] hover:bg-[#efbdeb] px-4 lg:px-6 py-2 lg:py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-sm"
                        >
                          <IconComponent className="w-4 h-4 mr-0" />
                          {category.name}
                        </Button>
                      )
                    })}
                  </div>

                  {/* Sample Questions */}
                  <div className="space-y-1 w-full max-w-2xl">
                    {sampleQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="w-full text-left px-4 py-2 text-[#79367d] dark:text-gray-300 hover:bg-[#efbdeb]/20 dark:hover:bg-gray-800/60 rounded-xl transition-all duration-200 border border-transparent hover:border-purple-100 dark:hover:border-gray-700 hover:shadow-sm text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="py-8 space-y-6 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`font-sans font-light text-sm lg:max-w-[70%] px-3 py-2 rounded-2xl transition-all duration-200 ${message.role === "user"
                        ? "bg-[#f5dcef] max-w-[85%] text-gray-800 border border-[#efbdeb] ml-auto"
                        : "text-gray-800 min-w-[100%]"
                        }`}
                    >
                      <div className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 pb-0 lg:p-0 border-t border-purple-50 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-purple-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here"
                  className="border-0 bg-transparent outline-none ring-0 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-20 text-sm py-4 px-6 rounded-2xl focus-within:ring-4 focus-within::outline-4 focus-within:ring-purple-100 dark:focus-within:ring-gray-700 focus:ring-0 focus:outline-none resize-none min-h-[56px] max-h-[120px]"
                  disabled={isLoading}
                  rows={1}
                />

                {/* Send Button */}
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-3 bottom-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl w-10 h-10 shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? <LoadingDots /> : <ArrowUp className="w-4 h-4" />}
                </Button>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between px-6 pb-4 pt-2">
                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-700 px-3 py-1 rounded-lg text-sm"
                        >
                          {selectedModel}
                          <ChevronDown className="w-3 h-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-gray-800 border-purple-100 dark:border-gray-700">
                        <DropdownMenuItem
                          onClick={() => setSelectedModel("Gemini 2.5 Flash")}
                          className="text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700"
                        >
                          Gemini 2.5 Flash
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedModel("Gemini Pro")}
                          className="text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700"
                        >
                          Gemini Pro
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-700 w-8 h-8 rounded-lg"
                    >
                      <Search className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-gray-700 w-8 h-8 rounded-lg"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-xs md:block hidden mr-10 mt-2 text-gray-400 dark:text-gray-500">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
