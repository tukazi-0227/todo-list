import { defineNuxtRouteMiddleware, navigateTo } from '#imports';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth();

  // 認証が必要なページかを確認
  if (to.meta.requiresAuth && !user) {
    return navigateTo('/login');
  }

  // 認証を保持している場合
  if ((to.path === '/login') && user) {
    return navigateTo('/');
  }
});
