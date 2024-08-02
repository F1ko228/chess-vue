<template>
    <div class="invalid">
        <h1 class="text-invalid">{{ text }}</h1>
    </div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true,
            },
        },
    }
</script>

<style scoped>
    .invalid {
        width: 250px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #8B0000;
        color: #fff;
        transition: .3s;
        border-radius: 5px;
    }
    .invalid:hover {
        background-color: #9B0000;
    }
    .text-invalid {
        text-transform: uppercase;
        font-size: 11px;
    }
</style>
