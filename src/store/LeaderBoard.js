import { api } from "../api"

const store = {
    state() {
        return {
            leaders: [],
        }
    },
    mutations: {
        populate(state, arrOfLeaders) {
            state.leaders = arrOfLeaders;
        }
    },
    actions: {
        async loadLeaderBoard({commit}) {
            try {
                const response = await api.get('/users?sortBy=-rating');
                const listOfUsers = response.data.slice(0, 10);
                commit('populate', listOfUsers);
            } catch(error) {
                console.log(error);
            }
        }
    },
}

export { store as leadersStore}