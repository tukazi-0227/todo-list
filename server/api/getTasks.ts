import { defineEventHandler } from 'h3';
import { getFirestoreInstance } from '../../plugins/firebaseAdmin.server';
import { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';

interface QueryParams {
    userId: string;
}

export default defineEventHandler(async (event) => {
    try {
        const db = getFirestoreInstance();

        const { userId } = getQuery(event) as QueryParams;

        const taskRef = db.collection('users').doc(userId).collection('toDo');
        const taskSnapshot: QuerySnapshot<DocumentData> = await taskRef.get();

        // 全タスクの取得
        const tasks = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return {success: true, tasks};
    } catch (error) {
        return { error: 'タスクを取得できませんでした' };
    }
});