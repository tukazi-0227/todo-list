<template>
  <!-- メニューバー -->
  <div @click="toggleMenuLink">
    <ul v-if="!isMenuLinkVisible" class="navigation-menu">
      <li v-for="link in links" :key="link.label">
        <component :is="link.to ? 'NuxtLink' : 'button'" v-bind="link.to ? { to: link.to } : {}"
          @click="handleClick(link)" class="navigation-link">
          <i :class="link.icon"></i>
          {{ link.label }}
        </component>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import type { VerticalNavigationLink } from '~/types/navigation';

// ユーザー情報とログイン情報を取得
const { user } = useAuth();
const router = useRouter();
const isMenuLinkVisible = ref<boolean>(false);

// ログアウト処理
const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('ログアウトに失敗しました:', error);
  }
};

const links = computed<VerticalNavigationLink[]>(() => {
  const baseLinks: VerticalNavigationLink[] = [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/'
    }
  ];

  if (user) {
    baseLinks.push({
      label: 'ログアウト',
      icon: 'i-heroicons-home',
      onClick: logout
    });
  }

  return baseLinks;
});

const handleClick = (link: VerticalNavigationLink) => {
  if (link.onClick) {
    link.onClick();
  }
};

// メニューリンクの表示非表示
const toggleMenuLink = () => {
  isMenuLinkVisible.value = !isMenuLinkVisible.value;
}

// メニューリンクの初期化
onMounted(() => {
  isMenuLinkVisible.value = false;
});
</script>

<style scoped>
.navigation-menu {
  list-style: none;
  padding: 0;
}

.navigation-link {
  font-family: 'Arial', sans-serif;
  font-size: 15px;
  display: flex;
  padding: 10px;
  color: #000000;
  cursor: pointer;
}
</style>