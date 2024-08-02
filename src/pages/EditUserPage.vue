<script setup>  
    import { useStore } from 'vuex'
    import { computed, onMounted } from 'vue'
    const store = useStore();
    let user = computed(() => store.state.user.user);
    onMounted(() => {
        console.log(user);
        console.log(user.value.name);
        }
    );

    // доделать аватарку, сделать гибкость
</script>

<template>
    <section class="main">
        <h1>Редактирование профиля</h1>
        <div class="main-edit">
            <div class="main-edit__image">
                <img v-if="!!user.avatar" :src="user.avatar" alt="user" class="main-edit__image-avatar">
                <img v-else src="../assets/NoUser.png" alt="user" class="main-edit__image-avatar">
                <button>изменить</button>
            </div>
        </div>
        <div class="main-buttons">
            <button>сохранить</button>
            <button>отмена</button>
        </div>
    </section>
</template>

<style scoped>
    .main {
        width: 80%;
        min-width: 900px;
        max-width: 1600px;
        height: 70vh;
        background: #303030;
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .main-edit__image {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .main-edit__image-avatar {
        border-radius: 50%; 
        width: 150px; 
        height: 150px;
        border: 1px solid black;
    }
</style>