<template>
    <header class="header">
        <h1 class="header-title">Todoアプリ</h1>
    </header>
</template>

<script setup>
</script>

<style scoped>
.header {
    font-family: 'Arial', sans-serif;
    font-size: 20px;
    width: 100%;
    background-color: #06a01d;
    padding: 20px;
    text-align: center;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.header-title {
    margin: 0;
}

@media (max-width: 768px) {
    .header {
        font-size: 18px;
        padding: 15px;
    }
}
</style>