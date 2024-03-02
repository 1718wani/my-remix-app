import { authenticator } from "~/features/Auth/services/authenticator";
import { prisma } from "~/libs/db";

export const updateHighlight = async (
  highlightId: number,
  request: Request,
  played?: boolean,
  saved?: boolean,
  liked?: boolean
) => {
  const userId = await authenticator.isAuthenticated(request);
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const update = await prisma.userHighlight.upsert({
    where: {
      userId_highlightsId: {
        userId: userId,
        highlightsId: highlightId,
      },
    },
    update: {
      played: played,
      saved: saved,
      liked: liked,
    },
    create: {
      userId: userId,
      highlightsId: highlightId,
      played: played ?? false, 
      saved: saved ?? false, 
      liked: liked ?? false, 
    },
  });

  return update;
};
