import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    try {
        // 全タスクの取得
        const tasks = await prisma.toDo.findMany();
        return tasks;
    } catch (error) {
        return { error: 'タスクを取得できませんでした'};
    }
});