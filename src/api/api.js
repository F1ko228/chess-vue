import axios from 'axios'

axios.interceptors.response.use(function(response) {
    if(response.status === 401 || response.status === 403) {
        localStorage.removeItem('token')
        this.$router.push('/login');
    }
    return response;
})

axios.defaults.baseURL = 'https://b1dd4ebced30d030.mokky.dev';

export function setToken(token) {
    axios.defaults.headers['authorization'] = `Bearer ${token}`
}

export function removeToken() {
    axios.defaults.headers['authorization'] = undefined;
}

export default axios;

