<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter();
    function redirect() {
        router.push({name: 'main'});
    }
</script>

<template>
    <section class="main">
        <h1 class="main-title">Page not found</h1>
        <p class="main-text">вы попали на страницу, которой не существует.</p>
        <button class="main-button" @click.prevent="redirect">вернуться на главную</button>
    </section>
</template>

<style scoped>
    .main {
        height: 400px;
        min-width: 700px;
        width: 70%;
        background-color: rgb(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
        border-radius: 30px;
        border: 3px solid bisque;
    }
    .main-title {
        margin-top: 30px;
        color: #900000;
        letter-spacing: 2px;
        font-size: 40px;
    }
    .main-text {
        font-size: 15px;
        font-weight: 600;
        text-transform: uppercase;
    }
    .main-button {
        width: 300px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        text-transform: uppercase;
        font-size: 12px;
        outline: none;
        border: 2px solid #900000;
        transition: .4s;
    }
    .main-button:hover {
        color: #fff;
        background-color: #900000;
    }
</style>