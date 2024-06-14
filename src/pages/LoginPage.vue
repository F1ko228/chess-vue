<template>
    <div class="login-page">
        <h2 class="login-page__title">Chess</h2>
        <form class="login-page__form" action="" @submit.prevent="checkform" novalidate>
            <FormSignInvalid v-if="(v$.$errors.length >= 1 && v$.form.username.minLength.$invalid)" text="Мало символов в username" />
            <FormSignInvalid v-else-if="(v$.$errors.length >= 1 && v$.form.username.maxLength.$invalid)" text="Много символов в username" />
            <FormSignInvalid v-else-if="(v$.form.username.$dirty && v$.form.username.required.$invalid)" text="Поле username обязательно" />
            <FormSignInvalid v-else-if="(v$.$errors.length >= 1 && v$.form.password.minLength.$invalid)" text="Мало символов password" />
            <FormSignInvalid v-else-if="(v$.form.password.$dirty && v$.form.password.required.$invalid)" text="Поле password обязательно" />
            <FormSignInvalid v-else-if="( this.inputIncorrect )" text="Логин или пароль некорректны" />
            <FormSignInvalid v-else-if="( this.inputRequired )" text="Все поля обязательны для заполнения" />
            <div class="form-input" :class="v$.form.username.$invalid ? 'error' : ''">
                <p class="form-input__icon-wrapper">
                    <svg width="20px" height="20px" viewBox="0 0 448 512"><path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                </p>
                <input class="form-input__text" type="text" placeholder="Username" @input="v$.form.username.$touch" v-model.trim="form.username">
            </div>
            <div class="form-input" :class="v$.form.password.minLength.$invalid ? 'error' : ''">
                <p class="form-input__icon-wrapper" :onClick="lockview">
                    <svg v-if="this.lock == false" width="20px" height="20px" viewBox="0 0 448 512"><path fill="#ffffff" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                    <svg v-else width="20px" height="20px" viewBox="0 0 576 512"><path fill="#ffffff" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg>
                </p>
                <input class="form-input__text lock" type="password" name="current-password" placeholder="Password" @input="v$.form.password.$touch" v-model.trim="form.password">
            </div>
            <button class="form-button">Войти</button>
            <div class="login-page__bottom">
                <label class="bottom-remember">
                    <input class="bottom-remember__checkbox" type="checkbox">
                    <span class="checkbox-fake"></span>
                    <span>Запомнить меня</span>
                </label>
                <p class="bottom-forgot"><i>Забыли пароль?</i></p>
            </div> 
        </form>
        <p><router-link class="login-page__SignUp" to="/signup">Зарегистрироваться</router-link></p>
    </div> <!-- login-page -->
</template>

<script>
    import { required, minLength, maxLength } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';
    import FormSignInvalid from '../components/FormSignInvalid.vue';

    export default {
        components: {
            FormSignInvalid,
        },
        data () {
            return {
                form: {
                    username: '',
                    password: '',
                },
                lock: false,
                inputRequired: false,
                rememberMe: false,
                inputIncorrect: false,
            }
        },
        validations () {
            return {
                form: {
                    username: {
                        minLength: minLength(2),
                        maxLength: maxLength(15),
                        required,
                    },
                    password: {
                        minLength: minLength(5),
                        required,
                    }
                },
            }
        },
        methods: {
            lockview() {
                if(this.lock == false) {
                    this.lock = true;
                    setTimeout('console.log(this.lock)', 5000);
                    const attribute = document.querySelector('.form-input__text.lock');
                    attribute.setAttribute("type", "text"); 
                    return;
                }
                else {
                    const attribute = document.querySelector('.form-input__text.lock');
                    attribute.setAttribute("type", "password");
                    this.lock = false;
                    return;
                } 
            },
            async checkform() {
                this.v$.form.$touch;
                if(this.form.email == "" || this.form.username == "" || this.form.password == "" || this.form.repeatPassword == "") {
                    this.inputRequired = true;
                    return;
                }
                else if(this.v$.$error) {
                    return;
                }
                else {
                    try {
                        await this.$store.dispatch('auth', { name: this.form.username, password: this.form.password });
                        await this.$router.push("/main");
                    } catch(error) {
                        console.log('Ошибка авторизации', error);
                        this.inputIncorrect = true;
                        return;
                    }
                }
            },
        },
        setup () {
            return {
                v$: useVuelidate(),
            }
        },  
    }
</script>

<style scoped>
    .login-page {
        width: 500px;
        height: 550px;
        background-color: #000;
        opacity: .9;
        border-radius: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .login-page__title {
        color: #fff;
        text-transform: uppercase;
        font-size: 22px;
    }
    .login-page__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
    }
    .form-input {
        background-color: #404040;
        gap: 10px;
        width: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 50px;
        height: 55px;
    }
    .form-input__text {
        width: 250px;
        height: 50px;
        border: none;
        background-color: #404040;
        color: #fff;
        border-radius: 50px;
        font-size: 18px;
        padding-left: 10px;
    }
    .form-input__icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        background-color: #606060;
        height: 50px;
        width: 50px;
        margin-left: 5px;
    }
    .form-input__text:focus {
        outline: none;
    }
    .form-button {
        width: 300px;
        height: 55px;
        border-radius: 50px;
        background-color: #606060;
        outline: none;
        border: none;
        color: #fff;
        text-transform: uppercase;
        font-size: 16px;
        transition: .3s;
    }
    .form-button:hover {
        background-color: #505050;
    }
    .login-page__bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        width: 280px;
    }
    .bottom-remember {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .login-page__SignUp {
        color: #fff;
        text-decoration: none;
        transition: all .3s;
    }
    .login-page__SignUp:hover {
        color: bisque;
    }
    .bottom-remember__checkbox {
        display: none;
    }
    .checkbox-fake {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 1px solid #fff;
        position: relative;
    }
    .checkbox-fake::before {
        content: '';
        position: absolute;
        display: block;
        width: 12px;
        height: 12px;
        background-color: bisque;
        opacity: 0;
        transition: .3s;
    }
    .bottom-remember__checkbox:checked + .checkbox-fake::before {
        opacity: 1;
    }
    .bottom-forgot {
        transition: .3s;
    }
    .bottom-forgot:hover {
        color: bisque;
    }
    .form-input__text.error {
        border: #8B0000 1px solid;
    }
</style>