<template>
  <div class="flex justify-center items-center h-screen space-y-1">
    <div class="flex space-x-20">
      <Task :tasks="taskList" @addTask="addTask" @updateTask="updateTask" @deleteTask="deleteTask" />
      <CalendarComponent :tasks="taskList" />
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  requiresAuth: true,
});

import CalendarComponent from '@/components/Calendar.vue';
import Task from '@/components/Task.vue';
import 'v-calendar/dist/style.css';
import { onMounted, ref } from 'vue';

const taskList = ref<{ id: number; name: string; detail: string; date: Date }[]>([]);
const { user, loading, initFirebaseAuth } = useAuth();
// uidの取得
const userId = ref<string>("");

// 全タスクを取得するapi関数
const getTasks = async (userId: string) => {
  try {
    const response = await fetch(`/api/getTasks?userId=${encodeURIComponent(userId)}`, {
      method: 'GET',
    });
    const data = await response.json();

    // タスクの取得
    if (data.error) {
      console.error(data.error);
    } else if (data.tasks) {
      taskList.value = data.tasks.map((task: { id: number, taskName: string, taskText: string, deadlineDate: string }) => ({
        id: task.id,
        name: task.taskName,
        detail: task.taskText,
        date: new Date(task.deadlineDate)
      }));
      console.log(data);
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
        userId: userId.value,
        taskName: task.name,
        taskText: task.detail,
        deadlineDate: task.date.toISOString().split('T')[0],
      }),
    });
    const data = await response.json();
    console.log(data);

    // タスクの追加
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
        userId: userId.value,
        id: task.id,
        taskName: task.name,
        taskText: task.detail,
        deadlineDate: task.date.toISOString().split('T')[0],
      }),
    });
    const data = await response.json();
    console.log(data);

    // タスクの更新
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
      body: JSON.stringify({ id, userId: userId.value }),
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

// マウント時に全タスクを取得
onMounted(async () => {
  // todo認証処理
  const user: any = await initFirebaseAuth();
  userId.value = user.uid
  getTasks(userId.value);
});
</script>