'use server'

import prisma from "../../../libs/db";
import { currentUser } from "@clerk/nextjs/server"

export async function getChatHistory(petId = null, category = null) {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error('No autorizado')
    }

    const userWithPets = await prisma.user.findUnique({
      where: { clerkId: user.id },
      include: {
        pets: {
          select: {
            id: true,
            name: true,
            type: true,
            imageUrl: true,
          }
        }
      }
    })

    if (!userWithPets) {
      throw new Error('Usuario no encontrado')
    }

    const baseQuery = {
      where: {
            userId: userWithPets.id,
        ...(category && { category })
      },
      include: {
        pet: {
          select: {
            name: true,
            type: true,
            imageUrl: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }

    if (petId) {
      const petExists = userWithPets.pets.some(pet => pet.id === BigInt(petId))
      if (!petExists) {
        throw new Error('Mascota no encontrada o no pertenece al usuario')
      }
      baseQuery.where.petId = BigInt(petId)
    }

    const history = await prisma.chatHistory.findMany(baseQuery)

    return { 
      success: true, 
      data: history,
      user: {
        id: userWithPets.id,
        name: userWithPets.name,
        email: userWithPets.email
      },
      pets: userWithPets.pets
    }
  } catch (error) {
    console.error('Error al obtener historial:', error)
    return { 
      success: false, 
      error: 'Error al obtener el historial', 
      details: error.message 
    }
  }
} 