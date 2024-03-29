import { prisma } from "~/libs/db";

export const getRadioshowById = async (radioshowId: number) => {
  return await prisma.radioshow.findUnique({
    where: { id: radioshowId },
  });
};

