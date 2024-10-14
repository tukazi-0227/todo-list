import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    try {
        // タスクの追加
        const newTask = await prisma.toDo.create({
            data: {
                taskName: body.taskName,
                taskText: body.taskText || '',
                deadlineDate: body.deadlineDate,
            },
        });
        return { success: true, task: newTask };
    } catch (error) {
        return { error: 'タスクを追加できませんでした' };
    }
});