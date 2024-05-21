<template>
    <p @click.prevent="redirect" class='nickname'>{{ userAuth.name }}</p>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        computed: {
            ...mapState({userAuth: state => state.userAuth.user})
        },
        methods: {
            redirect() {
                this.$router.push(`/profile/${this.userAuth.id}`)
            },
        },
    }
</script>

<style scoped> 
    .nickname {
        font-size: 20px;
        color: #fff;
        transition: .3s;
    }
    .nickname:hover {
        color: bisque;
        cursor: pointer;
    }
</style>