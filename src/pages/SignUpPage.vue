<template>
    <div class="sign-page">
        <h2 class="sign-page__title">Chess</h2>
        <form class="sign-page__form" action="" @submit.prevent="checkform" novalidate>
            <FormSignInvalid v-if="(v$.form.email.email.$invalid && v$.form.email.$dirty)" text="Не валидная почта" />
            <FormSignInvalid v-else-if="(v$.form.email.$dirty && v$.form.email.required.$invalid)" text="Поле email обязательно" />
            <FormSignInvalid v-else-if="(v$.$errors.length >= 1 && v$.form.username.minLength.$invalid)" text="Мало символов в username" />
            <FormSignInvalid v-else-if="(v$.$errors.length >= 1 && v$.form.username.maxLength.$invalid)" text="Много символов в username" />
            <FormSignInvalid v-else-if="(v$.form.username.$dirty && v$.form.username.required.$invalid)" text="Поле username обязательно" />
            <FormSignInvalid v-else-if="(v$.$errors.length >= 1 && v$.form.password.minLength.$invalid)" text="Мало символов password" />
            <FormSignInvalid v-else-if="(v$.form.password.$dirty && v$.form.password.required.$invalid)" text="Поле password обязательно" />
            <FormSignInvalid v-else-if="(v$.form.repeatPassword.$dirty && v$.form.repeatPassword.required.$invalid)" text="Поле Repeat password обязательно" />
            <FormSignInvalid v-else-if="(v$.form.repeatPassword.minLength&& v$.$errors.length >= 1 )" text="Мало символов в Repeat password" />
            <FormSignInvalid v-else-if="( this.compPassword == true && v$.form.password.$dirty && v$.form.repeatPassword.$dirty )" text="Пароли не совпадают" />
            <FormSignInvalid v-else-if="( this.inputRequired == true )" text="Все поля обязательны для заполнения" />
            <div class="form-input form-input__email" :class="{ error: v$.form.email.email.$invalid }">
                <p class="form-input__icon-wrapper"><svg width="20px" height="20px" viewBox="0 0 512 512"><path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></p>
                <input class="form-input__text" type="email" placeholder="Email" @input="v$.form.email.$touch" v-model.trim="form.email">
            </div>
            <div class="form-input form-input__username" :class="v$.form.username.minLength.$invalid ? 'error' : '' || v$.form.username.maxLength.$invalid ? 'error' : ''">
                <p class="form-input__icon-wrapper"><svg width="20px" height="20px" viewBox="0 0 448 512"><path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></p>
                <input class="form-input__text" type="text" placeholder="Username" @input="v$.form.username.$touch" v-model.trim="form.username">
            </div>
            <div class="form-input form-input__password" :class="v$.form.password.minLength.$invalid ? 'error' : ''">
                <p class="form-input__icon-wrapper" @click="this.lock = !this.lock">
                    <svg v-if="this.lock == false" width="20px" height="20px" viewBox="0 0 448 512"><path fill="#ffffff" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                    <svg v-else width="20px" height="20px" viewBox="0 0 576 512"><path fill="#ffffff" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg>
                </p>
                <input class="form-input__text text-password" :type="this.lock ? 'text' : 'password'" placeholder="Password" @input="v$.form.password.$touch" v-model.trim="form.password">
            </div>
            <div class="form-input form-input__repeatPassword" :class="v$.form.repeatPassword.minLength.$invalid ? 'error' : ''">
                <p class="form-input__icon-wrapper" @click="this.lock = !this.lock">
                    <svg v-if="this.lock == false" width="20px" height="20px" viewBox="0 0 448 512"><path fill="#ffffff" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
                    <svg v-else width="20px" height="20px" viewBox="0 0 576 512"><path fill="#ffffff" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg>
                </p>
                <input class="form-input__text text-repeat" :type="this.lock ? 'text' : 'password'" name="new-password" placeholder="Repeat password" @input="v$.form.repeatPassword.$touch" v-model.trim="form.repeatPassword">
            </div>
            <button class="form-button">Войти</button>
        </form>
        <p><router-link class="sign-page__login" to="/login">Вы уже зарегестрированны?</router-link></p>
    </div> <!-- sign-page -->
</template>

<script>
    import FormSignInvalid from '../components/FormSignInvalid.vue'
    import { required, minLength, email, maxLength, } from '@vuelidate/validators'
    import { useVuelidate } from '@vuelidate/core'
    import { mapActions } from 'vuex';


    export default {
        components: {
            FormSignInvalid,
        },
        data () {
            return {
                form: {
                    email: '',
                    username: '',
                    password: '',
                    repeatPassword: '',
                },
                lock: false,
                compPassword: false,
                inputRequired: false,
            }
        },
        validations () {
            return {
                form: {
                    email: {
                        required,
                        email, 
                    },
                    username: {
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(15),
                    },
                    password: {
                        required,
                        minLength: minLength(5),
                    },
                    repeatPassword: {
                        required,
                        minLength: minLength(5),
                    },
                },
            }
        },
        methods: {
            checkform() {
                this.v$.form.$touch
                this.comparePasswords()
                if(this.form.email == "" || this.form.username == "" || this.form.password == "" || this.form.repeatPassword == "") {
                    this.inputRequired = true
                    return;
                }
                else if(this.v$.$error) {
                    return;
                }
                else if(this.form.password !== this.form.repeatPassword) {
                    return;
                }
                else {
                    this.$store.dispatch('signUp', { name: this.form.username, email: this.form.email, password: this.form.password });
                    this.$router.push("/main");
                    // window.location.reload();
                    return;
                }
                
            },
            comparePasswords() {
                if(this.form.password !== this.form.repeatPassword) {
                    this.compPassword = true
                    return;
                }
                else {
                    this.compPassword = false
                    return;
                }
            },
            ...mapActions(['signUp']),
        },
        setup () {
            return { v$: useVuelidate() }
        },
    }
</script>

<style scoped>
    .sign-page {
        width: 500px;
        height: 700px;
        background-color: #000;
        opacity: .9;
        border-radius: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .sign-page__title {
        color: #fff;
        text-transform: uppercase;
        font-size: 22px;
    }
    .sign-page__form {
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
    .sign-page__login {
        color: #fff;
        text-decoration: none;
        transition: all .3s;
    }
    .sign-page__login:hover {
        color: bisque;
    }
    .form-input.error {
        border: #8B0000 1px solid;
    }
    .form-invalid {
        color: red;
    }
    .form-button:hover {
        background-color: #505050;
    }
</style>