import { defineEventHandler } from 'h3';
import { getFirestoreInstance } from '../../plugins/firebaseAdmin.server';

export default defineEventHandler(async (event) => {

    try {
        const db = getFirestoreInstance();

        const body = await readBody(event);
        const id = body.id;

        if (!id) {
            throw createError({ statusCode: 400, statusMessage: 'タスクIDが指定されていません' });
        }
        const taskDocRef = db.collection('users').doc(body.userId).collection('toDo').doc(id);

        // タスクの更新
        await taskDocRef.update({
            taskName: body.taskName,
            taskText: body.taskText || '',
            deadlineDate: body.deadlineDate,
        });

        const updatedDoc = await taskDocRef.get();

        const updatedTask = {
            id: updatedDoc.id,
            ...updatedDoc.data(),
        };

        return { success: true, task: updatedTask };
    } catch (error) {
        return { error: 'タスクを更新できませんでした' };
    }
});
