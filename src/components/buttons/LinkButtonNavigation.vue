<template>
    <button v-on:click="redirect" class="link-button">{{ text }}</button>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            },
        },
        methods: {
            redirect() {
                this.$router.push(this.link);
            },
        }
    }
</script>

<style scoped>
    .link-button {
        position: relative;
        width: 100px;
        height: 25px;
        background-color: rgb(30,89,69);
        color: #fff;
        border-radius: 5px;
        border: none;
        text-transform: uppercase;
        transition: .3s;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 50ms ease;
    }

    .link-button:before {
        position: absolute; 
        content: ' ';
        top: 0;
        left: 0;
        width: 0;
        height: 25px;
        border-radius: 5px;
        background-color: rgb(0,128,0, 0.3);
        position: absolute;
        transition: all 1s ease;
    }

    .link-button:hover:before {
        width: 100px;
    }
</style>