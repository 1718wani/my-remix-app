import { prisma } from "~/libs/db";

export const getAllRadioshows = async () => {
  const radioshows =  await prisma.radioshows.findMany();
  return radioshows
};
