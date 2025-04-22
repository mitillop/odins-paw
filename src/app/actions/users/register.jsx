"use server";

import prisma from "@/libs/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function createUser(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email ya está registrado" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    {
      id: user.id.toString(),
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return { success: true, token };
}
