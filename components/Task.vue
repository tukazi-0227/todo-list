<template>
    <div>
        <h2 class="title">
            <div>
                To Do
                <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" square variant="solid"
                    @click="toggleVisible" />
                <UCard v-if="isAddTask" class="task-card">
                    <div class="space-y-2">
                        <div class="flex items-center space-x-2">
                            <UInput v-model="taskName" color="primary" variant="outline" placeholder="タスク"
                                class="flex-grow" />
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton icon="i-heroicons-calendar-days-20-solid"
                                    :label="date ? format(date, 'd MMM, yyy') : '選択してください'" />

                                <template #panel="{ close }">
                                    <DatePicker v-model="date" is-required @select="close()" />
                                </template>
                            </UPopover>

                        </div>
                        <UTextarea v-model="additionalText" placeholder="詳細情報" class="additional-textarea" />
                        <div class="flex justify-end space-x-2">
                            <UButton size="sm" color="blue" variant="solid" label="追加" :trailing="false"
                                @click="handleClick()" />
                            <UButton size="sm" color="red" variant="solid" label="閉じる" :trailing="false"
                                @click="toggleVisible()" />
                        </div>
                    </div>
                </UCard>
            </div>
        </h2>
        <UCard class="todo-card">
            <div v-for="(task, index) in formattedTaskList" :key="index" class="flex items-center justify-between mb-4">
                <div>
                    <div class="font-bold">{{ task.name }}</div>
                    <div class="text-sm text-gray-500">{{ task.date }}</div>
                </div>
                <div class="flex space-x-2">
                    <UButton size="sm" color="blue" variant="solid" label="完了" @click="onDeleteTask(index)" />
                    <UButton size="sm" color="red" variant="solid" label="削除" @click="onDeleteTask(index)" />
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
const date = ref(new Date());
const taskName = ref('');
const isAddTask = ref(false);
const additionalText = ref('');

const props = defineProps<{
    tasks: { id: number; name: string; date: Date }[],
}>();

const emit = defineEmits<{
    (e: 'addTask', task: { name: string; date: Date }): void;
    (e: 'deleteTask', id: number): void;
}>();

const handleClick = () => {
    toggleVisible();
    addTask();
    console.log("追加されました");
};

const toggleVisible = () => {
    isAddTask.value = !isAddTask.value;
}

const addTask = () => {
    if (taskName.value === '' || !date.value) {
        return;
    }

    emit('addTask', { name: taskName.value, date: new Date(date.value) });
    taskName.value = '';
    date.value = new Date();
}

const onDeleteTask = (index: number) => {
    const task = props.tasks[index];
    if (task) {
        emit('deleteTask', task.id);  // indexではなくtaskのidをemitする
    }
};

const formattedTaskList = computed(() =>
    (props.tasks || []).map(task => ({
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

.task-card {
    position: fixed;
    top: 50px;
    left: 50px;
    z-index: 1000;
    width: 100%;
    height: 200px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
