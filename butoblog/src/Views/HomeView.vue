 <script setup>
 import {auth} from '@/firebase/config';
</script>
 <template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <!-- Navbar -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-indigo-600">ButoBlog</h1>
        <div class="space-x-4">
          <RouterLink to="/" class="text-gray-600 hover:text-indigo-600 font-semibold">Home</RouterLink>
          <a href="#" class="text-gray-600 hover:text-indigo-600 font-semibold">Blog</a>
          <RouterLink to="/login" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Login</RouterLink>
        </div>
      </div>
    </nav>
<div> {{ auth?.currentUser?.email }}</div>
    <!-- Hero Section -->
    <div class="flex items-center justify-center min-h-[70vh] px-4">
      <div class="text-center text-white max-w-2xl">
        <h2 class="text-5xl font-bold mb-4">Welcome to ButoBlog</h2>
        <p class="text-xl mb-8 opacity-90">Share your thoughts and ideas with the world. Create, publish, and connect with readers.</p>
        <div class="space-x-4">
          <RouterLink to="/register" class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block">Get Started</RouterLink>
          <a href="#explore" class="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-indigo-600 inline-block">Explore</a>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white py-16">
      <div class="max-w-6xl mx-auto px-4">
        <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose ButoBlog?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
            <div class="text-4xl mb-4">📝</div>
            <h4 class="text-xl font-bold mb-2 text-gray-800">Easy to Use</h4>
            <p class="text-gray-600">Simple and intuitive interface for writing and publishing.</p>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
            <div class="text-4xl mb-4">🌐</div>
            <h4 class="text-xl font-bold mb-2 text-gray-800">Global Reach</h4>
            <p class="text-gray-600">Share your stories with readers from around the world.</p>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
            <div class="text-4xl mb-4">⚡</div>
            <h4 class="text-xl font-bold mb-2 text-gray-800">Fast & Secure</h4>
            <p class="text-gray-600">Lightning-fast performance with enterprise-level security.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; 2026 ButoBlog. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>



<style  scoped>

</style>