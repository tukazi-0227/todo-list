import { defineEventHandler } from 'h3';
import { getFirestoreInstance } from '../../plugins/firebaseAdmin';


export default defineEventHandler(async () => {
    try {
        const db = getFirestoreInstance();

        
        const taskRef = db.collection('toDo');
        const taskSnapshot = await taskRef.get();

        // 全タスクの取得
        const tasks = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return tasks;
    } catch (error) {
        return { error: 'タスクを取得できませんでした'};
    }
});