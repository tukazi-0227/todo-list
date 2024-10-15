<template>
  <Header />
  <div class="flex justify-center items-center h-screen space-y-1">
    <div class="flex space-x-20">
      <Task :tasks="taskList" @addTask="addTask" @updateTask="updateTask" @deleteTask="deleteTask" />
      <div>
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
        <CalendarComponent :tasks="taskList" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Task from '@/components/Task.vue';
import CalendarComponent from '@/components/Calendar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import 'v-calendar/dist/style.css';

const taskList = ref<{ id: number; name: string; detail: string; date: Date }[]>([]);

// 全タスクを取得するapi関数
const getTasks = async () => {
  try {
    const response = await fetch('/api/getTasks');
    const data = await response.json();

    //dataチェック
    if (data.error) {
      console.error(data.error);
    } else {
      taskList.value = data.map((task: { id: number, taskName: string, taskText: string, deadlineDate: string }) => ({
        id: task.id,
        name: task.taskName,
        detail: task.taskText,
        date: new Date(task.deadlineDate)
      }));
    }
  } catch (error) {
    console.error('タスクの取得に失敗しました', error);
  }
};

// タスクを追加するapi関数
const addTask = async (task: { name: string, detail: string, date: Date }) => {
  try {
    const response = await fetch('/api/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName: task.name,
        taskText: task.detail,
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
        detail: data.task.taskText,
        date: new Date(data.task.deadlineDate),
      });
    }
  } catch (error) {
    console.log('タスクの追加に失敗しました', error);
  }
}

// タスクを更新するapi関数
const updateTask = async (task: { id: number; name: string, detail: string, date: Date }) => {
  try {
    const response = await fetch('/api/updateTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
        taskName: task.name,
        taskText: task.detail,
        deadlineDate: task.date.toISOString().split('T')[0],
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      console.error(data.error);
    } else {
      const index = taskList.value.findIndex(t => t.id === task.id);
      if (index !== -1) {
        taskList.value[index] = {
          id: data.task.id,
          name: data.task.taskName,
          detail: data.task.taskText,
          date: new Date(data.task.deadlineDate),
        };
      }
    }
  } catch (error) {
    console.log('タスクの追加に失敗しました', error);
  }
}

// タスクを削除するapi
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
</style>