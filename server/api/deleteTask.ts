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

        // タスクの存在確認
        const taskRef = db.collection('toDo').doc(id);
        const taskDoc = await taskRef.get();

        if (!taskDoc.exists) {
            throw createError({ statusCode: 404, statusMessage: 'タスクが見つかりませんでした' });
        }

        // タスクの削除
        await taskRef.delete();

        return { success: true, id };
    } catch (error) {
        console.error('削除時のエラー:', error);
        return { error: 'タスクを削除できませんでした' };
    }
});