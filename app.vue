<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-10">
    <div class="flex items-center space-x-2 max-w-lg">
      <UInput v-model="taskName" color="primary" variant="outline" placeholder="タスク" class="flex-grow" />
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid" :label="date ? format(date, 'd MMM, yyy') : '選択してください'" />

        <template #panel="{ close }">
          <!-- <DatePicker v-model="date" is-required @close="close" /> -->
          <DatePicker v-model="date" is-required @select="close()" />
        </template>
      </UPopover>
      <UButton size="sm" color="primary" variant="solid" label="追加" :trailing="false" @click="addTask()" />
    </div>
    <div>
      <h2>タスク名</h2>
      <div v-for="(task, index) in taskList" :key="index" class="mt-2">
        {{ task.name }} - {{ format(task.date, 'd MMM, yyy') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const date = ref(new Date())
const taskList = ref<{ name: string; date: Date }[]>([]);

const taskName = ref<string>('');
  const addTask = () => {
  if (taskName.value === '' || !date.value) {
    return;
  }

  taskList.value.push({ name: taskName.value, date: new Date(date.value) });

  taskName.value = '';
  date.value = new Date();  
}

</script>
