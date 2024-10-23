import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    try {
        // 該当idのタスク削除
        const deletedTask = await prisma.toDo.delete({
            where: {
                id: body.id,
            },
        });
        return { success: true, task: deletedTask };
    } catch (error) {
        console.error('削除時のエラー:', error);
    }
});