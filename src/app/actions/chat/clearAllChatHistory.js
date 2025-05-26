'use server'

import prisma from "../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";

export async function clearAllChatHistory() {
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

    // Eliminar todas las conversaciones del usuario
    const deletedCount = await prisma.chatHistory.deleteMany({
      where: {
        userId: existingUser.id,
      },
    });

    return {
      success: true,
      deletedCount: deletedCount.count,
      message: `Se eliminaron ${deletedCount.count} conversaciones`
    };
  } catch (error) {
    console.error('Error al limpiar historial:', error);
    return {
      success: false,
      error: 'Error al limpiar el historial',
      details: error.message
    };
  }
} 