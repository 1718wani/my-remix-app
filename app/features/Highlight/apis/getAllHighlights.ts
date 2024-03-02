import { prisma } from "~/libs/db";

export const getAllHighlights = async (radioshowId: number, userId?: string) => {
  const highlights = await prisma.highlight.findMany({
    where: { radioshowId },
    include: {
      userHighlights: {
        where: {
          userId: userId,
        },
        select: {
          saved: true,
          liked: true,
          played: true,
        },
      },
    },
  });
  return highlights;
};