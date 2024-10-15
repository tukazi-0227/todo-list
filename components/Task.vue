<template>
    <div>
        <h2 class="title">
            <div>
                To Do
                <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" square variant="solid"
                    @click="toggleVisible" />
                <UCard v-if="isAddTask || editingTaskIndex !== null" class="task-card">
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
                        <UTextarea v-model="taskText" placeholder="詳細情報" class="additional-textarea" />
                        <div class="flex justify-end space-x-2">
                            <UButton size="sm" color="blue" variant="solid" label="保存" :trailing="false"
                                @click="onSaveTask()" />
                            <UButton size="sm" color="red" variant="solid" label="キャンセル" :trailing="false"
                                @click="cancelEdit()" />
                        </div>
                    </div>
                </UCard>
            </div>
        </h2>
        <UCard class="todo-card">
            <div v-for="(task, index) in formattedTaskList" :key="index" class="flex items-center justify-between mb-4"
                style="width: 300px" :style="{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }">
                <div>
                    <div class="font-bold">{{ task.name }}</div>
                    <span v-if="!isTaskDetail[index]" @click="toggleDetail(index)" class="cursor-pointer text-blue-500"
                        :style="{ fontSize: '13px', textDecoration: 'underline' }">
                        詳細情報
                    </span>
                    <div v-if="isTaskDetail[index]" class="task-detail">
                        {{ task.detail }}
                        <div>
                            <span @click="toggleDetail(index)" class="cursor-pointer text-blue-500"
                                :style="{ fontSize: '13px', textDecoration: 'underline' }">
                                閉じる
                            </span>
                        </div>
                    </div>
                    <div class="text-sm text-gray-500">{{ task.date }}</div>
                </div>
                <div class="flex space-x-2">
                    <UButton size="sm" color="blue" variant="solid" label="更新" @click="editTask(index)" />
                    <UButton size="sm" color="red" variant="solid" label="完了" @click="onDeleteTask(index)" />
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
const date = ref(new Date());
const taskName = ref('');
const taskText = ref('');
const isAddTask = ref(false);
const isTaskDetail = ref<boolean[]>([]);
const editingTaskIndex = ref<number | null>(null);

const props = defineProps<{
    tasks: { id: number; name: string; detail: string; date: Date }[],
}>();

const emit = defineEmits<{
    (e: 'addTask', task: { name: string; detail: string; date: Date }): void;
    (e: 'updateTask', task: { id: number; name: string; detail: string; date: Date }): void;
    (e: 'deleteTask', id: number): void;
}>();

const toggleVisible = () => {
    isAddTask.value = !isAddTask.value;
}

const toggleDetail = (index: number) => {
    isTaskDetail.value[index] = !isTaskDetail.value[index];
};

const addTask = () => {
    if (taskName.value === '' || !date.value) {
        return;
    }

    emit('addTask', { name: taskName.value, detail: taskText.value, date: new Date(date.value) });
    taskName.value = '';
    taskText.value = '';
    date.value = new Date();
}

const onDeleteTask = (index: number) => {
    const task = props.tasks[index];
    if (task) {
        emit('deleteTask', task.id);
    }
};

const editTask = (index: number) => {
    const task = props.tasks[index];
    editingTaskIndex.value = index;
    taskName.value = task.name;
    taskText.value = task.detail;
    date.value = new Date(task.date);
}

const cancelEdit = () => {
    editingTaskIndex.value = null;

    isAddTask.value = false;
    taskName.value = '';
    taskText.value = '';
    date.value = new Date();
};

const onSaveTask = () => {
    if (taskName.value === '' || !date.value) {
        console.log("必須項目です");
        return;
    }

    if (editingTaskIndex.value !== null) {

        
        const task = props.tasks[editingTaskIndex.value];
        emit('updateTask', { id: task.id, name: taskName.value, detail: taskText.value, date: new Date(date.value) });
        editingTaskIndex.value = null;
        console.log("onSaveTaksが動いてます");
    } else {
        addTask();
    }


    taskName.value = '';
    taskText.value = '';
    date.value = new Date();
};

const formattedTaskList = computed(() =>
    (props.tasks || []).map(task => ({
        name: task.name,
        detail: task.detail,
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
    width: 100%;
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
    width: 400px;
    height: 200px;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.task-detail {
    font-size: 14px;
}
</style>
