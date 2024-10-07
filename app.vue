<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-5">
    <div class="flex items-center space-x-2 max-w-lg">
      <UInput v-model="taskName" color="primary" variant="outline" placeholder="タスク" class="flex-grow" />
      <UButton size="sm" color="primary" variant="solid" label="追加" :trailing="false" @click="addTask()" />
    </div>
    <div>
      <h2>タスク名</h2>
      <div v-for="taskName in taskNameList" :key="taskName" class="mt-2">
        {{ taskName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const taskNameList = ref<string[]>(['vue', 'Vue3', 'Nuxt3']);
const taskName = ref<string>('');
const addTask = () => {
  if (taskName.value === '') {
    return;
  }
  taskNameList.value.push(taskName.value);
  taskName.value = '';
}
</script>
