import { prisma } from "~/libs/db";

export const getAllHighlights = async (radioshowId: number) => {
  const highlights = await prisma.highlight.findMany({
    where: { radioshowId },
  });
  return highlights;
};
