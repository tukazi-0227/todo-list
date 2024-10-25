import { defineEventHandler } from 'h3';
import { getFirestoreInstance } from '../../plugins/firebaseAdmin';

export default defineEventHandler(async (event) => {

    try {
        const db = getFirestoreInstance();

        const body = await readBody(event);
        const id = body.id;

        if (!id) {
            throw createError({ statusCode: 400, statusMessage: 'タスクIDが指定されていません' });
        }
        const taskRef = db.collection('toDo').doc(id);

        // タスクの更新
        await taskRef.update({
            taskName: body.taskName,
            taskText: body.taskText || '',
            deadlineDate: body.deadlineDate,
        });

        const updatedDoc = await taskRef.get();

        const updatedTask = {
            id: updatedDoc.id,
            ...updatedDoc.data(),
        };

        return { success: true, task: updatedTask };
    } catch (error) {
        return { error: 'タスクを更新できませんでした' };
    }
});
