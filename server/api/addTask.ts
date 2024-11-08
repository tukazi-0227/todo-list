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
        const userDocRef = db.collection('users').doc(body.userId);
        await userDocRef.set({ userId: body.userId }, { merge: true });
        
        // ユーザーごとにタスクの追加
        const addTask = await userDocRef.collection('toDo').add(taskData);

        // 追加したタスク
        const newTask = {
            id: addTask.id,
            ...taskData,
        }

        return { success: true, userDocRef, task: newTask };
    } catch (error) {
        console.error(error);
        return { error: 'タスクを追加できませんでした' };
    }
});