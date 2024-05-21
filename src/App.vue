<template>
  <div class="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
  import NavigationBar from "./components/NavigationBar.vue"
  import { setToken } from './api'
  import { mapActions } from "vuex";

  export default {
    name: 'App',
    components: {
      NavigationBar,
    },
    async mounted() {
      const token = localStorage.getItem('token');
      if(token) {
        setToken(token);
        await this.$store.dispatch('getMe');
      }
    },
    methods: {
      ...mapActions(['getMe'])
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .app {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #191919;
    background-image: url('./assets/chessbg2.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center center; 
    gap: 120px;
  }
</style>
