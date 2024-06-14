import { api, setToken, removeToken } from '../api'

const userAuth = {
    state() {
        return {
            token: '',
            auth: false,
            user: {
                email: '', 
                name: '',
                id: '', 
                rating: '',
                avatar: '',
            },
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user.name = user.name; 
            state.user.email = user.email; 
            state.user.id = user.id; 
            state.auth = true;
        },
        removeUser(state) {
            state.auth = false;
        }
    },
    actions: {
        async auth({ commit }, { name, password }) {
            try {
                let response = await api.post('/auth', {
                        name,
                        password,
                });
                const user = response.data.data
                const token = response.data.token
                commit('setUser', user)
                commit('setToken', token)
                localStorage.setItem('token', token)
                setToken(token)
                console.log(user)
            } catch(error) {
                throw new Error(error);
            }
        },
        async signUp({ commit }, { name, email, password }) {
            try {
                let response = await api.post('/register', {
                        name,
                        email,
                        password,
                });
                console.log(response)
                const user = response.data.data
                const token = response.data.token
                commit('setUser', user)
                commit('setToken', token)
                localStorage.setItem('token', token)
                setToken(token)
            } catch(error) {
                console.log(error);
            }
        },
        async getMe({ commit }) {
            try{
                let response = await api.get('/auth_me');
                console.log(response)
                const user = response.data;
                console.log(user)
                commit('setUser', user);
            } catch(error) {
                console.log(error)
            }
        }, 
        async logOut({ commit }) {
            try {
                commit('removeUser');
                localStorage.removeItem('token');
                removeToken()
            } catch(error) {
                console.log(error)
            }
        },
        async deleteUser({ commit }, id) {
            try {
                let user = {
                    id: '',
                    name: '',
                    rating: '',
                    email: '',
                    avatar: '',
                };
                let response = await api.delete(`/users/${id}`);
                commit('setUser', user);
                commit('removeUser');
                console.log(response);
                localStorage.removeItem('token');
                removeToken();
            } catch(error) {
                console.log(error)
            }
        },
    }
}

export { userAuth } 