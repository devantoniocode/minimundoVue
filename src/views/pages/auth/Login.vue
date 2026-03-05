<script setup>
import { ref } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import AxiosMixin from '@/mixins/AxiosMixin';
import { userStorage } from '@/storage/UserStorage';
import { useRouter } from 'vue-router';
import TextForm from '@/componentes/Inputs/TextForm.vue';
import PasswordForm from '@/componentes/Inputs/PasswordForm.vue';

const email = ref('');
const password = ref('');
const errors = ref({});


const router = useRouter();
const axiosMixin = AxiosMixin;
const localStorageStore = userStorage();
const login = () => {
    let formData = {
        email: email.value,
        password: password.value
    };
    axiosMixin.methods
        .axiosPostData('http://127.0.0.1:8000/api/auth/login', formData)
        .then((response) => {
            localStorageStore.setUserLogged(response.data.user);
            localStorageStore.setToken(response.data.token);

            router.push('/');
        })
        .catch((error) => {
            errors.value.email = error?.response?.data?.errors['email'];
            errors.value.password = error?.response?.data?.errors['password'];
        });
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">O mini mundo!</div>
                        <span class="text-600 font-medium">Faça login para continuar</span>
                    </div>

                    <div>
                        <text-form label="Email" v-model="email" placeholder="Email address" :lower="true" class="block text-900 text-xl font-medium mb-2 p-1" :search="true" :errors="errors.email" />

                        <password-form label="Password" v-model="password" placeholder="Password" :toggleMask="true" class="block text-900 font-medium text-xl mb-2 p-1" :search="true" :errors="errors.password" />

                        <Button label="Entrar" class="w-full p-3 text-xl" @click="login" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
