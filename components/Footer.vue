<template>
    <footer class="footer">
        <p class="footer-text">© Todoアプリ. All rights reserved.</p>
    </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    width: 100%;
    background-color: #06a01d;
    padding: 10px;
    text-align: center;
    color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
}

.footer-text {
    margin: 0;
}

@media (max-width: 768px) {
    .footer {
        font-size: 14px;
        padding: 15px;
    }
}
</style>
