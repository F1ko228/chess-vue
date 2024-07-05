<template>
  <div class="main-page">
    <div class="main-page__play">
      <div class="play__elem">
        сыграть онлайн
      </div>
      <div class="play__elem">
        сыграть локально
      </div>
      <div class="play__elem">
        сыграть с компьютером
      </div>
    </div>
    <div class="main-page__players">
      <h3 class="players-title">
        Топ 10 игроков ресурса
      </h3>
      <div class="players-block">
          <loaderMain v-if="leaders.length == 0" />
          <TopUsers v-for="user in leaders" :key="user.id" :name="user.name" :rating="user.rating" v-on:click="this.$router.push(`/profile/${user.id}`)" />
      </div>
    </div>
  </div>
</template>

<script>
import TopUsers from '../components/TopUsers.vue'
import { mapActions, mapState } from 'vuex'
import loaderMain from '../components/loading/loaderMain.vue'
export default {
  components: {
    TopUsers,
    loaderMain,
  },
  async mounted() {
    console.log(this.$store)
    try {
      await this.$store.dispatch('loadLeaderBoard');
    } catch(error) {
      console.log(error);
    }
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(['loadLeaderBoard']),
  },
  computed: {
    ...mapState({ leaders: state => state.leaders.leaders }),
  },
}
</script>

<style scoped>
.main-page {
  width: 90%;
  max-width: 1600px;
  height: 70vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.main-page__play {
  width: 30%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.play__elem {
  width: 100%;
  height: 60px;
  color: #fff;
  text-transform: uppercase;
  background-color: #454545;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transition: .3s;
  opacity: .7;
}

.play__elem:hover {
  box-shadow: 5px 4px 8px 1px rgba(2, 14, 22, 0.2);
  background-color: #404040;
  opacity: 1;
}

.main-page__players {
  width: 30%;
  min-width: 350px;
  height: 400px;
  max-height: 400px;
  background-color: #fff;
  opacity: .5;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.players-title {
  text-transform: uppercase;
  color: #404040;
}

.players-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 5px;
  overflow-y: auto;
  scrollbar-width: none;
}

</style>