"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/libs/db";

export async function getCurrentUser() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    
    // console.log(user);
    return user;
  } catch (error) {
    return null;
  }
}
