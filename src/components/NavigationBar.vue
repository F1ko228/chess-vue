<template>
    <nav class="nav">
        <h1><router-link class="nav__logo" to="/main">chess</router-link></h1>
        <div class="nav__elems">
            <div class="elem elem-play">
                <p class="dropcontent">играть</p>
                <div class="dropcontent-down">
                    <a href="">с ботом</a>
                    <a href="">локально</a>
                    <a href="">онлайн</a>
                </div>
            </div>
            <p class="elem">Поддержать</p>
            <p class="elem">Задания</p>
            <p class="elem">Чат</p>
            <div class="profile" v-if="userAuth.auth">
                <NameInNavigation />
                <div class="logout" @click.prevent='unauthorization'>logout</div>
            </div>
            <LinkbuttonNavigation v-else text="Войти" link="/login" />
        </div>
    </nav>
</template>

<script>
    import LinkbuttonNavigation from './buttons/LinkButtonNavigation.vue'
    import NameInNavigation from './NameInNavigation.vue'
    import { mapState, mapActions } from 'vuex'

    export default {
        components: {
            LinkbuttonNavigation,
            NameInNavigation,
        }, 
        computed: {
            ...mapState({userAuth: state => state.userAuth}),
        },
        methods: {
            ...mapActions(['logOut']),
            unauthorization() {
                this.$store.dispatch('logOut');
                this.$router.push('/main');
            },
        },
    } 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .nav {
        width: 90%;
        max-width: 1600px;
        height: 40px; 
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .nav__logo {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 24px;
        color: white;
        text-decoration: none;
    }
    .nav__elems {
        display: flex;
        align-items: center;
        gap: 80px;
    }
    .elem {
        color: #fff;
        text-transform: uppercase;
        transition: .3s;
        font-size: 19px;
        height: 100%;
    }
    .elem-button {
        width: 100px;
        height: 25px;
        background-color: #454545;
        color: #fff;
        border-radius: 50px;
        border: none;
        text-transform: uppercase;
        transition: .3s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .elem:hover {
        color: bisque;
    }
    .elem-button:hover {
        color: bisque;
    }
    .elem.elem-play {
        position: relative;
        transition: .6s;
    }
    .dropcontent {
        color: #fff;
        text-transform: uppercase;
        transition: .3s;
    }
    .dropcontent:hover {
        color: bisque;
    }
    .dropcontent-down {
        display: none;
        z-index: 1;
        width: 80px;
        position: absolute;
        border-top: 1px solid bisque;
        padding-top: 10px;
    }
    .dropcontent-down a {
        font-size: 14px;
        text-decoration: none;
        color: #fff;
        transition: .3s;
        height: 30px;
    }
    .elem.elem-play:hover .dropcontent-down {
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: 3px;
        transition: .3s;
    }
    .dropcontent-down a:hover {
        color: bisque;
    }
    .profile {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .logout {
        width: 60px;
        height: 20px;
        cursor: pointer;
        background-color: red;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
</style>
