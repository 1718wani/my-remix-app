import { prisma } from "~/libs/db";

export const getAllSavedHighlights = async (
  userId: string,
  radioshowId: number
) => {
  const savedHighlights = await prisma.userHighlight.findMany({
    where: {
      userId: userId, 
      saved: true,
      highlights: {
        radioshowId: radioshowId, 
      },
    },
    include: {
      highlights: true, 
    },
  });

  return savedHighlights;
};
