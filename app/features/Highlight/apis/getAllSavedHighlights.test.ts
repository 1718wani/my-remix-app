import { prisma } from "~/libs/db";
import { getAllSavedHighlights } from "./getAllSavedHighlights";

jest.mock("~/libs/db", () => ({
  prisma: {
    userHighlight: {
      findMany: jest.fn().mockResolvedValue([
        // Mocked response
        {
          id: 1,
          userId: 'user1',
          highlightId: 1,
          saved: true,
          highlights: {
            id: 1,
            title: 'Test Highlight',
            radioshowId: 1,
          },
        },
      ]),
    },
  },
}));

describe('getAllSavedHighlights', () => {
  it('fetches saved highlights for a given user and radioshow', async () => {
    const userId = 'user1';

    const savedHighlights = await getAllSavedHighlights(userId);

    expect(prisma.userHighlight.findMany).toHaveBeenCalledWith({
      where: {
        userId: userId,
        saved: true
      },
      include: {
        highlights: true,
      },
    });

    expect(savedHighlights).toEqual([
      {
        id: 1,
        userId: 'user1',
        highlightId: 1,
        saved: true,
        highlights: {
          id: 1,
          title: 'Test Highlight',
        },
      },
    ]);
  });
});