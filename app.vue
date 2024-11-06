<template>
  <Header />
  <NuxtPage />
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useAuth } from '@/composables/useAuth';

const {user, loading} = useAuth();

// ユーザー情報を共有
provide('user', user);
provide('loading', loading);
</script>