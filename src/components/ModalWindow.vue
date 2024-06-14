<template>
    <div class="window">
        <div class="modal">
            <p class='close' @click.prevent="this.onClose"><img src="../assets/cross.svg" alt="close"></p>
            <div>
                <slot>

                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
            }
        },
        methods: {
            onClose() {
                this.show = !this.show;
            },
            keyOnClose() {
                window.addEventListener('keydown', function(e) {
                    if(e.key === 'Escape') {
                        this.show = !this.show;
                    }
                })
            }
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
        margin: 15px auto;
        border: 1px solid bisque;
        width: 40%;
        height: 30%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
    .close {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        align-self: flex-end;
        margin-right: 15px;
        margin-top: 5px;
}
</style>