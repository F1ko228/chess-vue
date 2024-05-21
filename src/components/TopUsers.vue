<template>
    <div class="players">
        <p class="players-name">{{ name }}</p>
        <p class="players-rating">{{ rating }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
        },
    }
</script>
    
<style scoped>
    .players {
        width: 80%;
        height: 40px;
        min-height: 40px;
        background-color: #404040;
        border-radius: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: .3s;
    }
    .players-name {
        color: #fff;
        padding-left: 30px;
    }
    .players-rating {
        color: bisque;
        padding-right: 30px;
    }
    .players:hover {
        background-color: #353535;
    }
</style>