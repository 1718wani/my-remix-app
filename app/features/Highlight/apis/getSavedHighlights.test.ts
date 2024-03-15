import { prisma } from "~/libs/db";
import { getSavedHighlights } from "./getSavedHighlights";


const mockRequest = {
  headers: {
    get: () => "mocked-auth-token", 
  },
} as unknown as Request;

jest.mock("~/libs/db", () => ({
  prisma: {
    highlight: {
      findMany: jest.fn().mockResolvedValue([
        // savedがtrueのハイライト
        {
          id: 1,
          title: "Test Highlight 1",
          radioshow: {
            id: 1,
            title: "Test Radio Show 1",
          },
          userHighlights: [
            {
              userId: "mocked-user-id",
              saved: true,
              liked: false,
              played: false,
            },
          ],
        },
        // savedがfalseのハイライト
        {
          id: 2,
          title: "Test Highlight 2",
          radioshow: {
            id: 2,
            title: "Test Radio Show 2",
          },
          userHighlights: [
            {
              userId: "mocked-user-id",
              saved: false,
              liked: true,
              played: true,
            },
          ],
        },
      ]),
    },
  },
}));


jest.mock("~/features/Auth/services/authenticator", () => ({
  authenticator: {
    isAuthenticated: jest.fn().mockResolvedValue("mocked-user-id"),
  },
}));

describe("getAllSavedHighlights", () => {
  it("fetches saved highlights for a given user", async () => {
    const skip = 0; 
    const savedHighlights = await getSavedHighlights(mockRequest, skip);
    console.log(savedHighlights,"test")
    

    expect(prisma.highlight.findMany).toHaveBeenCalledWith({
      where: {
        userHighlights: {
          some: {
            userId: "mocked-user-id", 
            saved: true,
          },
        },
      },
      include: {
        radioshow: true,
        userHighlights: {
          where: {
            userId: "mocked-user-id", 
          },
          select: {
            saved: true,
            liked: true,
            played: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: 30,
    });

    expect(savedHighlights).toEqual([
      {
        id: 1,
        title: "Test Highlight 1",
        radioshow: {
          id: 1,
          title: "Test Radio Show 1",
        },
        userHighlights: [
          {
            userId: "mocked-user-id",
            saved: true,
            liked: false,
            played: false,
          },
        ],
      },
    ]);
  });
});
