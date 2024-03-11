import { authenticator } from "~/features/Auth/services/authenticator";
import { prisma } from "~/libs/db";

export const getViewedHighlights = async (
  request: Request,
  skip?: number,
  take?: number
) => {
  const userId = await authenticator.isAuthenticated(request);

  const highlights = await prisma.highlight.findMany({
    include: {
      radioshow: true, // Radioshowのデータを取得
      userHighlights: userId
        ? {
            where: {
              userId: userId,
            },
            select: {
              saved: true,
              liked: true,
              played: true,
            },
          }
        : {},
    },
    skip: skip,
    take: take,
  });
  return highlights;
};
