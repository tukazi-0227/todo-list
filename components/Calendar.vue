<template>
  <div>
    <!-- Calendarコンポーネントのヘッダー -->
    <div class="flex justify-between items-center w-full">
      <h2 class="title mx-auto">Calendar</h2>
      <UTooltip>
        <template #text>
          <span style="color: blue;">●</span> タスクがある日
          <span style="color: green;">●</span> 今日の日付
        </template>
        <UIcon name="i-heroicons-light-bulb" class="w-5 h-5" />
      </UTooltip>
    </div>

    <!-- カレンダー表示 -->
    <UCard class="calendar-card">
      <div class="flex space-x-2">
        <div class="calendar-container">
          <v-calendar v-model="selectedDate" is-expanded :attributes="events" style="width: 400px; height: 300px;"
            @dayclick="handleDayClick" />
        </div>
        <UCard class="calendar-container">
          <h2 class="task-title">タスク</h2>
          <div v-for="(task, index) in filteredTasks" :key="index" class="flex justify-center mb-2">
            <UTooltip :text="task.detail" v-if="task.detail">
              <UButton class="task-container">{{ task.name }}</UButton>
            </UTooltip>
          </div>
        </UCard>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns';
import 'v-calendar/dist/style.css'

const selectedDate = ref(new Date());

// タスクの型定義
interface Task {
  id: number;
  name: string;
  detail: string;
  date: Date;
}

// Props定義
const props = defineProps<{
  tasks: Task[],
}>();

// イベント定義
const events = computed(() => [
  { key: 'events', highlight: { style: { backgroundColor: 'blue' } }, dates: props.tasks.map(task => task.date) },
  { key: 'today', highlight: { style: { backgroundColor: 'green' } }, dates: new Date() }
]);

// 日付クリック処理
const handleDayClick = (day: any) => {
  selectedDate.value = day.date;
}

// 選択日付のフィルタリング
const filteredTasks = computed(() =>
  props.tasks.filter(task =>
    format(task.date, 'yyyy-MM-dd') === format(selectedDate.value, 'yyyy-MM-dd')
  )
);
</script>

<style scoped>
.task-title {
  font-family: 'Arial', sans-serif;
  font-size: 15px;
  width: 130px;
  font-weight: bold;
  color: #040404;
  border-bottom: 2px solid #ddd;
  margin-bottom: 3px;
  text-align: center;
  padding: 5px;
}

.task-container {
  display: block;
  width: 130px;
}

.calendar-container {
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
