import { api, setToken } from '../api'

const userAuth = {
    state() {
        return {
            token: '',
            auth: false,
            user: {
                email: '', 
                name: '',
                id: '', 
            },
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
            state.auth = true;
        }
    },
    actions: {
        async auth({ commit }, { name, password }) {
            try {
                let response = await api.post('/auth', {
                        name,
                        password,
                });
                const user = response.data.data.name
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
                const user = response.data.data.name
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
                const user = {
                    email: '', 
                    name: '',
                    id: '', 
                };
                commit('setUser', user);
                localStorage.removeItem('token');
            } catch(error) {
                console.log(error)
            }
        },
        // async deleteUser({ commit }, name) {
            //         //     try {
                        
            //         //     } catch(error) {
            //         //         console.log(error)
            //         //     }
            //         // }
    }
}

export { userAuth } 