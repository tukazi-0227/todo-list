import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

export function useAuth() {
  const user = ref<User | null>(null);
  const loading = ref<boolean>(true);

  onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      loading.value = false;
    });
  });

  return { user, loading };
}