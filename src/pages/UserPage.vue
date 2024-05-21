<template>
    <section class="user">
        <div class="first-info">
            <img v-if="!!user.avatar" :src="user.avatar" alt="avatar" class='image-user' />
            <img v-else src="../assets/NoUser.png" alt="avatar" class='image-user' />
            <div class="info-nameRating">
                <p class="name">{{ user.name }}</p>
                <p class="rating">рэйтинг: {{ user.rating }}</p>
            </div>
        </div>
        <div class="second-info">
            <div class="user-friends">
                
            </div>
            <div class="user-stat">

            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        async mounted() {
            await this.$store.dispatch('loadUser', this.id)
        },
        methods: {
            ...mapActions(['loadUser']),
        },
        computed: {
            ...mapState({user: state => state.user.user}),
        },
    }
</script>

<style scoped>
    .user {
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
    .first-info {
        width: 80%;
        height: 250px;
        background-color: #606060;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 100px;
    }
    .second-info {
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .user-friends {
        height: 220px;
        background: #606060;
        width: 45%;
        border-radius: 50px;
    }
    .user-stat {
        height: 220px;
        background: #606060;
        width: 40%;
        border-radius: 50px;
    }
    .info-nameRating {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }
    .name {
        background-color: #505050;
        width: 200px;
        height: 40px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 25px;
        border-radius: 50px;
    }
    .rating {
        background-color: #505050;
        width: 200px;
        height: 30px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 50px;
    }
    .image-user {
        border-radius: 50%; 
        margin-left: 100px;
        width: 150px; 
        height: 150px;
        border: 1px solid black;
        display: flex;
    }
</style>