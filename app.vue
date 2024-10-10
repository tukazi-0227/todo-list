<template>
  <Header />
  <div class="flex flex-col justify-center items-center h-screen space-y-1">
    <div class="flex space-x-20">
      <div>
        <div class="flex items-center space-x-2">
          <UInput v-model="taskName" color="primary" variant="outline" placeholder="タスク" class="flex-grow" />
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid"
              :label="date ? format(date, 'd MMM, yyy') : '選択してください'" />

            <template #panel="{ close }">
              <DatePicker v-model="date" is-required @select="close()" />
            </template>
          </UPopover>
          <UButton size="sm" color="primary" variant="solid" label="追加" :trailing="false" @click="addTask()" />
        </div>
        <div>
          <h2 class="title">To Do</h2>
          <UCard class="todo-card">

            <div v-for="(task, index) in formattedTaskList" :key="index" class="flex items-center justify-between mb-4">
              <div>
                <div class="font-bold">{{ task.name }}</div>
                <div class="text-sm text-gray-500">{{ task.date }}</div>
              </div>
              <div class="flex space-x-2">
                <UButton size="sm" color="blue" variant="solid" label="完了" @click="deleteTask(index)" />
                <UButton size="sm" color="red" variant="solid" label="削除" @click="deleteTask(index)" />
              </div>
            </div>
          </UCard>
        </div>
      </div>
      <div>
        <h2 class="title">Calendar</h2>
          <CalendarComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarComponent from '@/components/Calendar.vue';
import Header from '@/components/Header.vue';
import { format } from 'date-fns';
import 'v-calendar/dist/style.css';

const date = ref(new Date())
const taskList = ref<{ name: string; date: Date }[]>([
  { name: '仕事', date: new Date('2024-10-09') },
  { name: '宿題', date: new Date('2024-10-10') },
  { name: '買い物', date: new Date('2024-10-11') },
  { name: '運動', date: new Date('2024-10-12') },
  { name: '読書', date: new Date('2024-10-13') },
]);

const taskName = ref<string>('');
const addTask = () => {
  if (taskName.value === '' || !date.value) {
    return;
  }

  taskList.value.push({ name: taskName.value, date: new Date(date.value) });

  taskName.value = '';
  date.value = new Date();
}

const deleteTask = (index: number) => {
  taskList.value.splice(index, 1);
};

const formattedTaskList = computed(() =>
  taskList.value.map(task => ({
    name: task.name,
    date: format(new Date(task.date), 'yyyy年MM月dd日')
  }))
);

</script>

<style scoped>
.title {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #06a01d;
  text-align: center;
  padding: 10px;
}

.todo-card {
  width: 400px;
  height: 300px;
  overflow-y: auto;
  border: 5px solid #06a01d;
  padding: 10px;
}
</style>