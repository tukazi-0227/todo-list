import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let firebaseAdminApp: App;
let db: Firestore;

function getFirebaseAdminApp(): App {
  if (!firebaseAdminApp) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set');
    }

    const serviceAccount = JSON.parse(serviceAccountKey);

    if (!getApps().length) {
      firebaseAdminApp = initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      firebaseAdminApp = getApps()[0];
    }
  }
  return firebaseAdminApp;
}

function getFirestoreInstance(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseAdminApp());
  }
  return db;
}

export { getFirestoreInstance };
