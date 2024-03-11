import { prisma } from "~/libs/db";

export const getAllSavedHighlights = async (userId: string) => {
  const savedHighlights = await prisma.userHighlight.findMany({
    where: {
      userId: userId,
      saved: true,
    },
    include: {
      highlights: true,
    },
  });
  return savedHighlights;
};
