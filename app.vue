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
import { onMounted, ref } from 'vue';
import Task from '@/components/Task.vue';
import CalendarComponent from '@/components/Calendar.vue';
import Header from '@/components/Header.vue';
import 'v-calendar/dist/style.css';

const taskList = ref<{ id: number; name: string; date: Date }[]>([]);

// 全タスクを取得するapi関数
const getTasks = async () => {
  try {
    const response = await fetch('/api/getTasks');
    const data = await response.json();

    //dataチェック
    if (data.error) {
      console.error(data.error);
    } else {
      taskList.value = data.map((task: { id: number, taskName: string, deadlineDate: string }) => ({
        id: task.id,
        name: task.taskName,
        date: new Date(task.deadlineDate)
      }));
    }
  } catch (error) {
    console.error('タスクの取得に失敗しました', error);
  }
};

// タスクを追加するapi関数
const addTask = async (task: { name: string, date: Date }) => {
  try {
    const response = await fetch('/api/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName: task.name,
        deadlineDate: task.date.toISOString().split('T')[0],
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      console.error(data.error);
    } else {
      taskList.value.push({
        id: data.task.id,
        name: data.task.taskName,
        date: new Date(data.task.deadlineDate),
      });
    }
  } catch (error) {
    console.log('タスクの追加に失敗しました', error);
  }
}

const deleteTask = async (id: number) => {
  try {
    const response = await fetch('/api/deleteTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    // 該当idのデータ削除
    if (data.error) {
      console.error(data.error);
    } else {
      taskList.value = taskList.value.filter(task => task.id !== id);
    }
  } catch (error) {
    console.error('タスクの削除に失敗しました', error);
  }
};

// マウント時ににタスクを取得
onMounted(getTasks);
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