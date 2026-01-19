<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>
      
      <form @submit.prevent="createpost" class="space-y-6">
        <!-- Title Field -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Post Title</label>
          <input 
          v-model="title"
            type="text" 
            placeholder="Enter your post title"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
        </div>

        <!-- Content Field -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Content</label>
          <textarea 
          v-model="Content"
            placeholder="Write your post content here..."
            rows="10"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-800"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition duration-200"
        >
          Publish Post
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { useRouter } from 'vue-router';
const router = useRouter();  

          const title = ref ("");
          const Content = ref (""); 
          
          const createpost = ( ) => {
              addDoc(collection(db, 'posts'),{
                title: title.value,
                content: Content.value,
                authorId: auth.currentUser.uid,
                email: auth.currentUser.email,
                createdAt: new Date ()
              }) 
               router.push('/home');
          }
</script>

<style  scoped>

</style>