import { prisma } from "~/libs/db";

export const checkUserExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user !== null;
};
