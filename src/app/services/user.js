import prisma from "../../../prisma/client";
import bcrypt from "bcryptjs";

export const createUser = async (data) => {
  const uniqueEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (uniqueEmail) {
    return {
      error: "Email already exists",
    };
  }
  const saltRounds = 10;
  const hashedPassword = await bycript.hash(data.password, saltRounds);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const getUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const loginUser = async (data) => {
  const user = await prisma.user.findUnique({
    where: {email: data.email},
  });

  if (!user) {
    return { error: "User not found" };
  }

  const passwordValid = await bcrypt.compare(data.password, user.password);
  if (!passwordValid) {
    return { error: "Invalid password" };
  }

  return { user };
};
