import bcrypt from "bcryptjs";
import type { RegisterFormType } from "../types/registerFormType";
import { prisma } from "~/libs/db";

export const createUser = async (user: RegisterFormType) => {
  const passwordHash = await bcrypt.hash(user.password, 12);
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      name: user.name,
    },
  });
  return { id: newUser.id, email: newUser.email, newUser: newUser.name };
};
