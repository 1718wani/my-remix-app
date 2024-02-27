import { prisma } from "~/libs/db";
import { createHighlight } from "./createHighlight";

// Prismaクライアントのモックを修正
jest.mock("~/libs/db", () => ({
  prisma: {
    highlight: {
      create: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        replayUrl: 'http://example.com',
        userId: 'user1',
        radioshowId: 1,
      }),
    },
  },
}));

describe('createHighlight', () => {
  it('creates a new highlight and returns it', async () => {
    const formData = {
      title: 'Test Title',
      description: 'Test Description',
      replayUrl: 'http://example.com',
      userId: 'user1',
      radioshowId: 1,
    };

    // createHighlight関数をテスト
    const result = await createHighlight(formData);

    // prisma.highlight.createが期待通りの引数で呼び出されたことを確認
    expect(prisma.highlight.create).toHaveBeenCalledWith({
      data: {
        title: 'Test Title',
        description: 'Test Description',
        replayUrl: 'http://example.com',
        createdBy: {
          connect: { id: 'user1' },
        },
        radioshow: {
          connect: { id: 1 },
        },
      },
    });

    // 関数が新しいハイライトオブジェクトを返すことを確認
    expect(result).toEqual({
      id: 1,
      title: 'Test Title',
      description: 'Test Description',
      replayUrl: 'http://example.com',
      userId: 'user1',
      radioshowId: 1,
    });
  });
});