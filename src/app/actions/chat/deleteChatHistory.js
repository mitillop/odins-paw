'use server'

import prisma from "../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";

export async function deleteChatHistory(chatId) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error('No autorizado');
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }

    const chatHistory = await prisma.chatHistory.findFirst({
      where: {
        id: BigInt(chatId),
        userId: existingUser.id,
      },
    });

    if (!chatHistory) {
      throw new Error('Conversación no encontrada o no tienes permisos para eliminarla');
    }

    const deletedChat = await prisma.chatHistory.delete({
      where: {
        id: BigInt(chatId),
      },
      include: {
        pet: {
          select: {
            name: true,
            type: true,
            imageUrl: true,
          }
        }
      }
    });

    return {
      success: true,
      data: {
        ...deletedChat,
        id: Number(deletedChat.id),
        userId: Number(deletedChat.userId),
        petId: deletedChat.petId ? Number(deletedChat.petId) : null,
      }
    };
  } catch (error) {
    console.error('Error al eliminar conversación:', error);
    return {
      success: false,
      error: 'Error al eliminar la conversación',
      details: error.message
    };
  }
} 