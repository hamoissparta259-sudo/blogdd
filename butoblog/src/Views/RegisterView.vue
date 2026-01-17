 <script setup>
import { signinwithEmailAndPassword } from 'firebase/auth';    
import {ref} from 'vue';


const email = ref(null);
const password = ref(null);
const login = async () => {
 await   signinwithEmailAndPassword(auth, email.value, password.value)
}

</script>




<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2 text-center">Register</h1>
      <p class="text-gray-600 text-center mb-8">Create your account</p>

      <form @submit.prevent="login" class="space-y-5">
        <div v-if="errMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{{ errMessage }}</div>

      
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" v-model="email" placeholder="your@email.com" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition">
        </div>
        
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Password</label>
          <input type="password" v-model="password" placeholder="••••••••" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition">
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-2">Confirm Password</label>
          <input type="password" v-model="confirmPassword" placeholder="••••••••" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition">
        </div>
        <div class= "text-red-500">
            {{ errMessage }}
        </div>
        <button type="submit" :disabled="loading" class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition">
          
        </button>
      </form>
      
      <p class="text-center text-gray-600 mt-6">Already have an account? <RouterLink to="/login" class="text-green-500 hover:underline font-semibold">Sign In</RouterLink></p>
    </div>
  </div>
</template>



<style  scoped>

</style>