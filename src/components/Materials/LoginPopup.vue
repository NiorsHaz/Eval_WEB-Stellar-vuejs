<script>
import Popup from './Popup.vue';

export default {
    components: { Popup },
    props: {
        modelValue: {
            type: Boolean,
            required: true
        }
    },
    emits: ['update:modelValue', 'login'],
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        submitLogin() {
            this.$emit('login', {
                email: this.email,
                password: this.password
            });
            this.$emit('update:modelValue', false);
        }
    }
};
</script>

<template>
    <Popup :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <div class="login-form">
            <h2>Connexion</h2>
            <form @submit.prevent="submitLogin">
                <label>Username</label>
                <input type="text" v-model="email" required />

                <label>Mot de passe</label>
                <input type="password" v-model="password" required />

                <button type="submit">Se Connecter</button>
            </form>
        </div>
    </Popup>
</template>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
}

.login-form h2 {
    font-family: anton-regular;
    font-size: 32px;
    margin-bottom: 1rem;
}

.login-form form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.login-form input {
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
}

.login-form button {
    background-color: #104C64;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-family: anton-regular;
    cursor: pointer;
    transition: background 0.3s ease;
}

.login-form button:hover {
    background-color: #0c3c4f;
}
</style>
