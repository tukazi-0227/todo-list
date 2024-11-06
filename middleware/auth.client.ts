import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import { getAuth } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // 認証が必要なページかを確認
  if (to.meta.requiresAuth && !user) {
    return navigateTo('/login');
  }

  // 認証を保持している場合
  if ((to.path === '/login') && user) {
    return navigateTo('/');
  }
});
