import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter} from 'vue-router'
import MainPage from './pages/MainPage.vue'
import LoginPage from './pages/LoginPage.vue'
import SignUpPage from './pages/SignUpPage.vue'
import UserPage from './pages/UserPage.vue'
import { leadersStore } from './store/LeaderBoard'
import { userPageStore } from './store/UserPage'
import { userAuth } from './store/Auth'
import { createStore } from 'vuex'
import { modalWindow } from './store/modalWindow'
import ErrorPage from './pages/ErrorPage.vue'
import EditUserPage from './pages/EditUserPage.vue'

const app = createApp(App)
const routes = [
    { path: '/main', component: MainPage, alias: '/', name: 'main' },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/signup', component: SignUpPage },
    { path: '/profile/:id', component: UserPage, props: true, meta: { authRequired: true }},
    { path: '/edit', component: EditUserPage, name: 'editPage' },
    { path: '/:patchMatch(.*)*', component: ErrorPage, name: 'notFound', },
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
store.registerModule('modalWindow', modalWindow)


app.use(router)
app.use(store)
app.mount('#app')



