import { api } from '../api'

const userPageStore = {
    state() {
        return {
            user: {
                id: '',
                name: '',
                rating: '',
                email: '',
                avatar: '',
            },
        }
    },
    mutations: {
        addUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        async loadUser({commit}, id) {
            try {
                const response = await api.get(`/users/${id}`);
                const user = response.data;
                commit('addUser', user)     
            } catch(error) {
                throw new Error(error);
            }
        },
    }
}



export { userPageStore }

