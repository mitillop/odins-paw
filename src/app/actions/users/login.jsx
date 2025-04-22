"use server";

import prisma from "@/libs/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function loginUser(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return { error: "Contraseña incorrecta" };
  }

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
  return { success: true };
}
