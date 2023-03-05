<template>
  <main class="my-10 mx-7 md:mx-20 font-main">
    <div class="border-b border-b-gray-400">
      <p class="inline font-medium border-b-2 border-b-mainRed text-mainRed">Recently shared</p>
    </div>
    <div v-if="articleStore.fetching_in_progress" class="text-xl ml-10 mt-10">loading...</div>
    <div v-else class="pb-4 border-b a-blog border-b-gray-400" v-for="article in articleStore.articles"
      :key="article.id">
      <div class="flex justify-between">
        <div class="flex items-center mt-5 content">
        <img :src='article.author.image' class="rounded-full w-11 h-11" alt="pic">
          <section v-if="article.author" class="ml-2">
            <p class="text-sm">{{ article.author.username }}</p>
            <p class="text-sm text-gray-700">{{ article.createdAt }}</p>
          </section>
        </div>

        <button  :class="{'red' : article.favorited }"
        @click="increaseLike(article.slug)"
          class="flex cursor-pointer items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-bloodRed border-bloodRed bg-cream">
            <span> {{ article.favoritesCount }} </span>
            <heart-icon />
          </button>

       
        
        
      </div>
      <div class="w-11/12 mt-4">
        <p class="">{{ article.title }}</p>
        <p class="text-sm text-gray-700">{{ article.description }}</p>
        <p class="mt-4 text-sm text-gray-700">see more... </p>
      </div>
    </div>
  </main>
</template>

<script>
import UserIcon from '../Icon/userIcon.vue';
import HeartIcon from '../Icon/heartIcon.vue';
import { useArticlesStore } from "../../stores/Articles";
import axios from 'axios';

export default {
  name: 'mainContent',

  setup(){
    const articleStore = useArticlesStore();

    return{
      articleStore
    }
  },

  components: {
    UserIcon,
    HeartIcon
  },

  data() {
    return {
      artTime: null,
      articles: null,
      isLiked: false, 
    };
  },

  created() {
    this.articleStore.getPosts();
  },

  methods :{
    increaseLike (slug){
      this.articleStore.toggleFav(slug)
    }
  }

  }

</script>

<style scoped>
.red {

  background-color: #880808;
  color: #ffebcd;

}
</style>