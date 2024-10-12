<template>
  <UCard class="calendar-card">
    <div class="flex space-x-2">
      <div class="calendar-container">
        <v-calendar v-model="selectedDate" is-expanded :attributes="events" style="width: 400px; height: 300px;" @dayclick="handleDayClick" />
      </div>
      <UCard class="calendar-container">
        <h2 class="title">タスク</h2>
        <div v-for="(task, index) in filteredTasks" :key="index" class="flex justify-center mb-2">
            <UButton class="todo-container">{{ task.name }}</UButton>
        </div>
      </UCard>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns';
import 'v-calendar/dist/style.css'

const selectedDate = ref(new Date());

const props = defineProps<{
  tasks: { name: string; date: Date }[],
}>();

const events = computed(() => [
  { key: 'events', highlight: { style: { backgroundColor: 'blue' } }, dates: props.tasks.map(task => task.date) },
  { key: 'today', highlight: { style: { backgroundColor: 'green' } }, dates: new Date() }
]);

const handleDayClick = (day: any) => {
  selectedDate.value = day.date;
}

const filteredTasks = computed(() =>
  props.tasks.filter(task =>
    format(task.date, 'yyyy-MM-dd') === format(selectedDate.value, 'yyyy-MM-dd')
  )
);
</script>

<style scoped>
.title {
  font-family: 'Arial', sans-serif;
  font-size: 15px;
  font-weight: bold;
  color: #040404;
  text-align: center;
  padding: 5px;
}

.todo-container {
  display: block;
  width: 100px;
}

.calendar-container {
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
