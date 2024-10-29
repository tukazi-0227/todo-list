import { defineEventHandler, readBody } from 'h3';
import { getFirestoreInstance } from '../../plugins/firebaseAdmin.server';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    try {
        const db = getFirestoreInstance();

        // タスクのデータ
        const taskData = {
            taskName: body.taskName,
            taskText: body.taskText || '',
            deadlineDate: body.deadlineDate,
        };
       
        // Firestoreにデータの追加
        const addTask = await db.collection('toDo').add(taskData);

        // 追加したタスク
        const newTask = {
            id: addTask.id,
            ...taskData,
        }

        return { success: true, task: newTask };
    } catch (error) {
        console.error(error);
        return { error: 'タスクを追加できませんでした' };
    }
});