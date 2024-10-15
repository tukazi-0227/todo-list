import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        // タスクの更新
        const updatedTask = await prisma.toDo.update({
            where: {
                id: body.id,
            },
            data: {
                taskName: body.taskName,
                taskText: body.taskText || '',
                deadlineDate: body.deadlineDate,
            },
        });
        return { success: true, task: updatedTask };
    } catch (error) {
        return { error: 'タスクを更新できませんでした' };
    }
});
