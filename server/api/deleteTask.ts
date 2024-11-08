import { defineEventHandler } from 'h3';
import { getFirestoreInstance } from '../../plugins/firebaseAdmin.server';

export default defineEventHandler(async (event) => {

    try {
        const db = getFirestoreInstance();

        const body = await readBody(event);
        const userId = body.userId;
        const id = body.id;

        if (!id) {
            throw createError({ statusCode: 400, statusMessage: 'タスクIDが指定されていません' });
        }

        // タスクの存在確認
        const taskDocRef = db.collection('users').doc(userId).collection('toDo').doc(id);

        if (!taskDocRef) {
            throw createError({ statusCode: 404, statusMessage: 'タスクが見つかりませんでした' });
        }

        // タスクの削除
        await taskDocRef.delete();

        return { success: true, id };
    } catch (error) {
        console.error('削除時のエラー:', error);
        return { error: 'タスクを削除できませんでした' };
    }
});