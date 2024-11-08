// types/firebase.d.ts
import { FirebaseApp } from 'firebase/app';
import { Auth, User } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { Ref } from 'vue';

declare module '#app' {
  interface NuxtApp {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
      currentUser: Ref<User | null>;
      authInitialized: Promise<void>;
    };
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $firebase: {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
      currentUser: Ref<User | null>;
      authInitialized: Promise<void>;
    };
  }
}
