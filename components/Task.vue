<template>
    <div>
        <!-- Taskコンポーネントのヘッダー -->
        <header class="header">
            <h2 class="title">
                To Do
                <UButton icon="i-heroicons-pencil-square" size="sm" color="primary" square variant="solid"
                    @click="toggleForm" />
            </h2>
        </header>

        <!-- 追加するタスクカードの表示 -->
        <UCard v-if="isFormVisible" class="task-card">
            <div class="space-y-2">
                <div class="flex items-center space-x-2">
                    <UInput v-model="taskName" color="primary" variant="outline" placeholder="タスク" class="flex-grow" />
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid"
                            :label="date ? format(date, 'd MMM, yyy') : '選択してください'" />
                        <template #panel="{ close }">
                            <DatePicker v-model="date" is-required @select="close()" />
                        </template>
                    </UPopover>
                </div>
                <UTextarea v-model="taskText" placeholder="詳細情報" class="additional-textarea" />
                <div class="button">
                    <UButton label="保存" color="blue" @click="saveTask()" />
                    <UButton label="閉じる" color="red" @click="resetForm()" />
                </div>
            </div>
        </UCard>

        <!-- Todoリスト一覧 -->
        <UCard class="todo-card">
            <div v-for="task in formattedTaskList" :key="task.id" class="task-item">
                <div>
                    <div class="font-bold">{{ task.name }}</div>
                    <div v-if="isDetailVisible(task.id)" class="task-detail">
                        {{ task.detail }}
                    </div>
                    <span @click="toggleDetail(task.id)" class="toggle-link">
                        {{ isDetailVisible(task.id) ? '閉じる' : '詳細情報' }}
                    </span>
                    <div class="text-sm text-gray-500">{{ task.formattedDate }}</div>
                </div>
                <div class="button">
                    <UButton color="blue" variant="solid" label="更新" @click="editTask(task)" />
                    <UButton color="red" variant="solid" label="完了" @click="deleteTask(task.id)" />
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
const isFormVisible = ref(false);
const editingTaskId = ref<number | null>(null);
const detailsVisible = ref<Record<number, boolean>>({});

// タスクの型定義
interface Task {
    id: number;
    name: string;
    detail: string;
    date: Date;
}

// Props定義
const props = defineProps<{ tasks: Task[] }>();

// Emits定義
const emit = defineEmits<{
    (e: 'addTask', task: Omit<Task, 'id'>): void;
    (e: 'updateTask', task: Task): void;
    (e: 'deleteTask', id: number): void;
}>();

// データフォーマット
const formattedTaskList = computed(() =>
    props.tasks.map(task => ({
        ...task,
        formattedDate: format(new Date(task.date), 'yyyy年MM月dd日'),
    }))
);

// 表示・非表示
const toggleForm = () => {
    isFormVisible.value = !isFormVisible.value;
    if (!isFormVisible.value) resetForm();
}

const toggleDetail = (id: number) => {
    detailsVisible.value[id] = !detailsVisible.value[id];
};

const isDetailVisible = (id: number) => detailsVisible.value[id];

// 追加or保存メソッド
const saveTask = () => {
    if (taskName.value === '' || !date.value) {
        alert("タスク名と日付は必須項目です");
        return;
    }

    if (editingTaskId.value !== null) {
        emit('updateTask', {
            id: editingTaskId.value,
            name: taskName.value.trim(),
            detail: taskText.value.trim(),
            date: date.value,
        });
    } else {
        emit('addTask', {
            name: taskName.value.trim(),
            detail: taskText.value.trim(),
            date: date.value,
        });
    }
    resetForm();
};

// 削除メソッド
const deleteTask = (id: number) => emit('deleteTask', id);

// 更新メソッド
const editTask = (task: Task) => {
    editingTaskId.value = task.id;
    taskName.value = task.name;
    taskText.value = task.detail;
    date.value = new Date(task.date);
    isFormVisible.value = true;
}

// リセットメソッド
const resetForm = () => {
    isFormVisible.value = false;
    editingTaskId.value = null;
    taskName.value = '';
    taskText.value = '';
    date.value = new Date();
}
</script>

<style scoped>
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

.task-item {
    width: 300px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
    margin-bottom: 15px;
}

.toggle-link {
    color: #3b82f6;
    cursor: pointer;
    font-size: 13px;
    text-decoration: underline;
}

.task-detail {
    font-size: 14px;
}
</style>
