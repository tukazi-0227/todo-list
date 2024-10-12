<template>
  <Header />
  <div class="flex flex-col justify-center items-center h-screen space-y-1">
    <div class="flex space-x-20">
      <Task :tasks="taskList" @addTask="addTask" @deleteTask="deleteTask" />
      <div>
        <h2 class="title">Calendar</h2>
        <CalendarComponent :tasks="taskList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue';
import CalendarComponent from '@/components/Calendar.vue';
import Header from '@/components/Header.vue';
import 'v-calendar/dist/style.css';

const taskList = ref<{ name: string; date: Date }[]>([
  { name: '仕事', date: new Date('2024-10-09') },
  { name: '宿題', date: new Date('2024-10-10') },
  { name: '買い物', date: new Date('2024-10-11') },
  { name: '買い物', date: new Date('2024-10-12') },
  { name: '読書', date: new Date('2024-10-13') },
]);

const addTask = (task: {name: string, date: Date}) => {
  taskList.value.push(task);
}

const deleteTask = (index: number) => {
  taskList.value.splice(index, 1);
};
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