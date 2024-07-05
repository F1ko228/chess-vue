<template>
    <div class="window">
        <div class="modal">
            <p class='close' @click="this.close"><img src="../assets/cross.svg" alt="close"></p>
            <div>
                <slot name="content">

                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions(['closeWindow']),
            async close() {
                await this.$store.dispatch('closeWindow');
            },
        },
    }
</script>

<style scoped>
    .window {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        position: fixed;
    }
    .modal {
        background-color: #fefefe;
        border-radius: 15px;
        margin: 15px auto;
        border: 3px solid bisque;
        width: 40%;
        height: 30%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: center;
    }
    .close {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        align-self: flex-end;
        margin-right: 15px;
        margin-top: 5px;   
        cursor: pointer;   
    }
</style>