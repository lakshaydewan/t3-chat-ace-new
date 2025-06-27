'use server'
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

export const createNewChat = async (message: Message) => {

    const session = await auth()
    const email = session?.user?.email

    const userFromDb = await prisma.user.findUnique({
        where: {
            email: email as string
        }
    })

    if (!userFromDb) {
        throw new Error("User not found")
    }
    const contentToSet: any = {}

    contentToSet[Date.now().toString()] = {
        content: message.content,
       role: message.role
    }


    const newChat = await prisma.chat.create({
        data: {
            title: message.content.substring(0, 10),
            userId: userFromDb.id,
            content: contentToSet,
        }
    })

    console.log(newChat)

    return newChat
}

export const createNewMessage = async (messages: any[], chatId: string) => {

    const session = await auth()
    const email = session?.user?.email

    const userFromDb = await prisma.user.findUnique({
        where: {
            email: email as string
        }
    })

    if (!userFromDb) {
        throw new Error("User not found")
    }

    // convert message to JSON
    console.log(messages)
    const messageObject: any = {}
    messages.forEach((message) => {
        messageObject[message.id] = {
            content: message.content,
            role: message.role
        }
    })

    const messageJSON = JSON.stringify(messageObject)

    const newMessage = await prisma.chat.update({
        where: {
            id: chatId
        },
        data: {
            content: messageJSON,
        }
    })
    console.log(newMessage)

    return newMessage
}

export const deleteChat = async (chatId: string) => {

    const session = await auth()
    const email = session?.user?.email

    const userFromDb = await prisma.user.findUnique({
        where: {
            email: email as string
        }
    })

    if (!userFromDb) {
        throw new Error("User not found")
    }

    const chat = await prisma.chat.delete({
        where: {
            id: chatId
        }
    })

    return chat
}

export const renameChat = async (chatId: string, title: string) => {

    const session = await auth()
    const email = session?.user?.email

    const userFromDb = await prisma.user.findUnique({
        where: {
            email: email as string
        }
    })

    if (!userFromDb) {
        throw new Error("User not found")
    }

    const chat = await prisma.chat.update({
        where: {
            id: chatId
        },
        data: {
            title: title,
        }
    })

    return chat
}