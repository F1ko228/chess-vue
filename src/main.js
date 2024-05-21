import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory, createRouter} from 'vue-router';
import MainPage from './pages/MainPage.vue';
import LoginPage from './pages/LoginPage.vue';
import SignUpPage from './pages/SignUpPage.vue';
import UserPage from './pages/UserPage.vue'
import { leadersStore } from './store/LeaderBoard'
import { userPageStore } from './store/UserPage'
import { userAuth } from './store/Auth'
import { createStore } from 'vuex';

const app = createApp(App)
const routes = [
    { path: '/main', component: MainPage, alias: '/' },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/signup', component: SignUpPage },
    { path: '/profile/:id', component: UserPage, props: true, meta: { authRequired: true }},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(rout => rout.meta.authRequired)) {
        if(!localStorage.getItem('token')) {
            next({name: 'Login'});
        } else {
            next();
        }
    } else {
        next();
    }
})

const store = createStore({

})

store.registerModule('leaders', leadersStore)
store.registerModule('user', userPageStore)
store.registerModule('userAuth', userAuth)


app.use(router)
app.use(store)
app.mount('#app')



