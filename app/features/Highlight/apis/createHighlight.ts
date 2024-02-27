import { prisma } from "~/libs/db";
import { createHighlightType } from "../types/createHighlightType";

export const createHighlight = async (formData: createHighlightType) => {
  const { title, description, replayUrl, userId, radioshowId } = formData;
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
