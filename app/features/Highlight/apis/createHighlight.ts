import { prisma } from "~/libs/db";
import { createHighlightType } from "../types/createHighlightType";
import { authenticator } from "~/features/Auth/services/authenticator";

export const createHighlight = async (formData: createHighlightType,request: Request) => {
  const { title, description, replayUrl, radioshowId } = formData;
  const userId = await authenticator.isAuthenticated(request);
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const newHighlight = await prisma.highlight.create({
    data: {
      title,
      description,
      replayUrl,
      createdBy: {
        connect: { id: userId },
      },
      radioshow: {
        connect: { id: radioshowId }, // RadioshowのID
      },
    },
  });
  console.log(newHighlight);
  return newHighlight;
};
