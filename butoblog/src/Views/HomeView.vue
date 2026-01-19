 <script setup>
 import {auth, db} from '@/firebase/config';
 import { collection, getDocs, orderBy, query, deleteDoc, doc, updateDoc }  from "firebase/firestore";
 import { onMounted } from 'vue';
 import { ref } from 'vue'; 
  let posts  = ref  ([]); 
  let editingId = ref(null);
  let editTitle = ref('');
  let editContent = ref('');
   
    const fetchPosts = async ()=> {
      const q = query (
        collection(db,'posts'),
        orderBy('createdAt','desc')
      );
      const snapshot = await getDocs(q);
      
      posts.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } 

    const deletePost = async (postId) => {
      if (confirm('Are you sure you want to delete this article?')) {
        try {
          await deleteDoc(doc(db, 'posts', postId));
          posts.value = posts.value.filter(post => post.id !== postId);
          alert('Article deleted successfully!');
        } catch (error) {
          console.error('Error:', error);
          alert('Error deleting article');
        }
      }
    };

    const editPost = (post) => {
      editingId.value = post.id;
      editTitle.value = post.title;
      editContent.value = post.content;
    };

    const cancelEdit = () => {
      editingId.value = null;
      editTitle.value = '';
      editContent.value = '';
    };

    const updatePost = async (postId) => {
      if (!editTitle.value.trim() || !editContent.value.trim()) {
        alert('Title and content cannot be empty!');
        return;
      }
      try {
        await updateDoc(doc(db, 'posts', postId), {
          title: editTitle.value,
          content: editContent.value
        });
        const postIndex = posts.value.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
          posts.value[postIndex].title = editTitle.value;
          posts.value[postIndex].content = editContent.value;
        }
        cancelEdit();
        alert('Article updated successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating article');
      }
    };

    onMounted(fetchPosts)

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

   

    <div class="flex items-center justify-center min-h-[70vh] px-4">
      <div class="text-center text-white max-w-2xl">
        <h2 class="text-5xl font-bold mb-4">Welcome to ButoBlog</h2>
        <p class="text-xl mb-8 opacity-90">Share your thoughts and ideas with the world. Create, publish, and connect with readers.</p>
        <div class="space-x-4">
          <RouterLink to="/register" class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block">Get Started</RouterLink>
          <RouterLink to="/createpost" class="bg-indigo-400 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-500 inline-block">New Post</RouterLink>
          <a href="#explore" class="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-indigo-600 inline-block">Explore</a>
        </div>
      </div>
    </div>

    <!-- Articles Section -->
    <div class="bg-gray-100 py-16">
      <div class="max-w-6xl mx-auto px-4">
        <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Latest Articles</h3>
        <div v-if="posts.length === 0" class="text-center text-gray-500 py-8">
          <p class="text-lg">No articles yet. Be the first to create one!</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div class="p-6">
              <!-- Edit Mode -->
              <div v-if="editingId === post.id" class="space-y-4">
                <input 
                  v-model="editTitle"
                  type="text"
                  placeholder="Edit title..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea 
                  v-model="editContent"
                  placeholder="Edit content..."
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
                <div class="flex gap-2">
                  <button 
                    @click="updatePost(post.id)"
                    class="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button 
                    @click="cancelEdit"
                    class="flex-1 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <!-- Display Mode -->
              <div v-else>
                <h4 class="text-xl font-bold text-gray-800 mb-2">{{ post.title }}</h4>
                <p class="text-gray-600 mb-4 line-clamp-3">{{ post.content }}</p>
                <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{{ post.author }}</span>
                  <span>{{ post.createdAt?.toDate?.().toLocaleDateString() || 'Recently' }}</span>
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="editPost(post)"
                    class="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deletePost(post.id)"
                    class="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
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
