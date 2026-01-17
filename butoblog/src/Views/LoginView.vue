<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { ref } from 'vue'; 
import { useRouter } from 'vue-router';

const email = ref(null);
const password = ref(null);
const errMessage = ref(null);
const router = useRouter();

const login = async () => {
    if (!email.value) { 
        errMessage.value = "Email cannot be empty";
        return;        
    }
 
    if (!password.value) {
        errMessage.value = "Password cannot be empty";
        return;
    }
      
    if (password.value.length < 6) {
        errMessage.value = "Password must be at least 6 characters";
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/home');
    } catch (error) {
        errMessage.value = error.message;
    }
}
</script>





<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2 text-center">Login</h1>
      <p class="text-gray-600 text-center mb-8">Welcome back</p>
      
      <div v-if="errMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{{ errMessage }}</div>
      
      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input v-model="email" type="email" placeholder="your@email.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
        </div>
        
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Password</label>
          <input v-model="password" type="password" placeholder="••••••••" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
        </div>
        
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition">
          Sign In
        </button>
      </form>
      
      <p class="text-center text-gray-600 mt-6">Don't have an account? <RouterLink to="/register" class="text-blue-500 hover:underline font-semibold">Sign Up</RouterLink></p>
    </div>
  </div>
</template>


<style scoped>

</style>