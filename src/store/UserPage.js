import { api } from '../api'
// import { removeToken } from '../api';

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
                console.log(error);
            }
        },
        // async deleteUser({ commit }, id) {
        //     try {
        //         let user = {
        //             id: '',
        //             name: '',
        //             rating: '',
        //             email: '',
        //             avatar: '',
        //         };
        //         let response = await api.delete(`/users/${id}`);
        //         commit('addUser', user)
        //         console.log(response);
        //         localStorage.removeItem('token')
        //         removeToken()
        //     } catch(error) {
        //         console.log(error)
        //     }
        // },
    }
}



export { userPageStore }

