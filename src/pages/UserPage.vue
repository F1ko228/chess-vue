<template>
    <modalWindow v-if="window">
        <template v-slot:content>
            <div class="content-window">
                <p class="content-window__title">Вы уверены в том, что хотите удалить ваш профиль ?</p>
                <div class="content-window__buttons">
                    <button class="button agree" @click.prevent="this.userRemove">Удалить</button>
                    <button class="button back" @click.prevent="closeWindow">Я передумал</button>
                </div>
            </div>
        </template>
    </modalWindow>
    <section v-if="this.loading == false" class="user">
        <div class="first-info">
            <img v-if="!!user.avatar" :src="user.avatar" alt="avatar" class='image-user' />
            <img v-else src="../assets/NoUser.png" alt="avatar" class='image-user' />
            <div class="info-nameRating">
                <h1 class="name">{{ user.name }}</h1>
                <p class="rating">рэйтинг: {{ user.rating }}</p>
                <p v-if="user.id === myUser.id" class="buttons">
                    <button class="edit" @click.prevent = "this.$router.push('/edit')">Редактировать профиль</button>
                    <button class="delete" @click.prevent="this.agreeWindow">Удалить профиль</button>
                </p>
            </div>
        </div>
        <div class="second-info">
            <div class="user-friends">
                
            </div>
            <div class="user-stat">

            </div>
        </div>
    </section>
    <loaderMain v-else />
</template>

<script>
import { mapActions, mapState } from 'vuex';
import loaderMain from '../components/loading/loaderMain.vue';
import modalWindow from '../components/ModalWindow.vue';

    export default {
        components: {
            loaderMain,
            modalWindow,
        },
        data() {
            return {
                loading: true,
            }
        },
        props: {
            id: {
                type: String,
                required: true,
            },
        },
        async mounted() {
            try {
                await this.$store.dispatch('loadUser', this.id);
                this.loading = false;
            } catch(error) {
                this.$router.push('/404');
            }
        },
        methods: {
            ...mapActions(['loadUser']),
            ...mapActions(['deleteUser']),
            ...mapActions(['openWindow']),
            ...mapActions(['closeWindow']),
            async agreeWindow() {
                if(this.user.id === this.myUser.id) {
                    await this.$store.dispatch('openWindow');
                }
                else {
                    console.log('error');
                }
            },
            async userRemove() {
                await this.$store.dispatch('deleteUser', this.id);
                this.$router.push('/main');
            },

        },
        computed: {
            ...mapState({user: state => state.user.user}),
            ...mapState({myUser: state => state.userAuth.user}),
            ...mapState({window: state => state.modalWindow.open}),
        },
        watch: { 
            id: async function(newVal) {
                this.loading = true;
                await this.$store.dispatch('loadUser', newVal);
                this.loading = false;
            },
      }
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
    .buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .edit {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 30px;
        border: 1px solid black;
        background: #a5e8a9;
        border-radius: 20px;
        color: #fff;
        transition: all .4s;
    }
    .edit:hover {
        background: #7bc37f;
    }
    .delete {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 30px;
        border: 1px solid black;
        background-color: #B00000;
        border-radius: 20px;
        color: #fff;
        transition: all .4s;
    }
    .delete:hover {
        background-color: #B90000;
    }
    .content-window {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 50px;
        align-items: center;
    }
    .content-window__title { 
        font-size: 21px;
        font-weight: 400;
    }
    .content-window__buttons {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 250px;
        height: 60px;
        cursor: pointer;
        text-transform: uppercase;
        transition: all .3s;
        position: relative;
        border: none;
        color: #fff;
        z-index: 200;
    }
    .button::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        height: 0;
        z-index: 2;
        transition: .3s;
    }
    .button::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: 1;
        transition: .3s;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        opacity: 0;
        transform: scale(0.1, 1);
    }
    .button:hover::before {
        opacity: 0;
    }
    .button.agree:hover {
        letter-spacing: 1.1px;
        transform: scale(1, 1); 
        background-color: rgb(255, 0, 0, 0.6);
    }
    .button.back:hover {
        letter-spacing: 1.1px;
        transform: scale(1, 1); 
        background-color: rgb(0, 200, 0, 0.6);
    }
    .button:hover::after {
        opacity: 1;
        transform: scale(1, 1); 
    }
    .button.agree {
        background-color: rgb(255, 0, 0, 0.7);
    }
    .button.back {
        background-color: rgb(0, 200, 0, 0.7);
    }
</style>
