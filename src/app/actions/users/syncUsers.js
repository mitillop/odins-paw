import prisma from "../../../libs/db"
import { currentUser } from "@clerk/nextjs/server"

export async function syncUserWithDB() {
  const user = await currentUser()

  if (!user) return

  const existing = await prisma.user.findUnique({
    where: { clerkId: user.id },
  })

  if (!existing) {
    const prismaUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName,
        imageUrl: user.imageUrl,
      },
    })
    return prismaUser;
  } else {
    return existing;
  }
}
