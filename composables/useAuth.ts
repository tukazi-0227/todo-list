import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

export function useAuth() {
  const user = ref<User | null>(null);
  const loading = ref<boolean>(true);

  const initFirebaseAuth = () => {
    const auth = getAuth();
    return new Promise((resolve) => {

      onAuthStateChanged(auth, (currentUser) => {
          // ログインしていれば中通る
          console.log(currentUser)
          debugger;
          resolve(currentUser)
      });

    })
  }

  return { user, loading, initFirebaseAuth };
}