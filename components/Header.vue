<template>
    <header class="header">
        <div v-if="!isButtonHidden">
            <UButton         
                size="md" 
                color="primary" 
                class="menu-button"
                @click="toggleMenu">
                Menu         
            </UButton>
            <MenuItems v-if="isMenuVisible" class="menu-bar" />
        </div>
        <h1 class="header-title">Todoアプリ</h1>
    </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { User } from 'firebase/auth';

const route = useRoute();
const hiddenPages = ['/login'];
const isMenuVisible = ref(false);
const user = inject('user') as Ref<User | null>;

// メニュー自体の表示非表示
const isButtonHidden = computed(() => {
    return hiddenPages.includes(route.path);
});

// メニューコンポーネントの表示・非表示
const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
}

// メニューバーの初期化
watch(user, (newUser, oldUser) => {
  if (newUser !== oldUser) {
    isMenuVisible.value = false;
  }
});
</script>

<style scoped>
.header {
    font-family: 'Arial', sans-serif;
    font-size: 20px;
    width: 100%;
    background-color: #06a01d;
    padding: 20px;
    text-align: center;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.header-title {
    margin: 0;
}

.menu-button {
    position: absolute;
    left: 20px;
    top: 30%;
}

.menu-bar {
    position: fixed;
    z-index: 1000;
    width: 20%;
    height: 5%;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 100%;
    left: 20px;
}

@media (max-width: 768px) {
    .header {
        font-size: 18px;
        padding: 15px;
    }
}
</style>