<template>
  <main class="my-10 mx-7 md:mx-20 font-main">
    <div class="border-b border-b-lightGray">
      <p class="inline font-medium border-b-2 text-brwn">Recently shared</p>
    </div>
    <div v-if="articleStore.fetching_in_progress === true" class="text-xl ml-10 mt-10">loading...</div>
    <div v-else class="pb-4 border-b a-blog border-b-lightGray" v-for="article in articleStore.articles"
      :key="article.id">
      <div class="flex justify-between">
        <div class="flex items-center mt-5 content">
          <div class="rounded-full w-11 h-11 bg-brwn">
            <UserIcon />

          </div>
          <section v-if="article.author" class="ml-2">
            <p class="text-sm">{{ article.author.username }}</p>
            <p class="text-sm text-gray">{{ article.createdAt }}</p>
          </section>
        </div>
        <button :class="likeBeRed" @click="likeCounter"
          class="flex cursor-pointer items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-red border-red hover:bg-lightGray">
          <label class="inline cursor-pointer max-h-full max-w-full" for="like">
            <span> {{ article.favoritesCount }} </span>
            <heart-icon class="inline" />
          </label>
        </button>
        <input type="checkbox" name="like" id="like" v-model="isLiked" class="hidden">
      </div>
      <div class="w-11/12 mt-4">
        <p class="">{{ article.title }}</p>
        <p class="text-sm text-gray">{{ article.description }}</p>
        <p class="mt-4 text-sm text-gray">see more... </p>
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
      isLoading: true
    };
  },

  created() {
    this.articleStore.getPosts();
  },

  computed: {
    likeBeRed() {
      return { red: this.isLiked };
    },

    likeCounter() {
      console.log('mewo');
      axios.post('https://api.realworld.io/api/articles/:slug/favorite').then((response) => {

        console.log(response.data.articles);
      })
        .catch((error) => {
          console.log(error);
        })
    },

  }
}
</script>

<style scoped>
.red {

  background-color: #880808;
  color: #ffebcd;

}
</style>