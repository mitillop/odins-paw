'use server'
import { ChartNoAxesColumnIcon } from "lucide-react"
import prisma from "../../../libs/db"
import { currentUser } from "@clerk/nextjs/server"

export async function getPets() {
    const user = await currentUser()
    if (!user) return null;

    const userData = await prisma.user.findUnique({
        where: { clerkId: user.id },
        include: { pets: true },
    })
    if (!userData) return null;
    const serializedPets = userData.pets.map(pet => ({
        ...pet,
        id: pet.id ? Number(pet.id) : null,
        age: pet.age ? String(pet.age) : null,
        userId: pet.userId ? Number(pet.userId) : null,
        weight: pet.weight ? Number(pet.weight) : null,
        createdAt: pet.createdAt.toISOString(),
        updatedAt: pet.updatedAt.toISOString()
    }));
    
    return serializedPets;
}