<template>
  <main class="my-10 mx-7 md:mx-20 font-main">
    <blog-lists />
    <div v-if="articleStore.fetching_in_progress" class="text-xl ml-10 mt-10">loading...</div>
    <div v-if="articleStore.articles.length == 0 && !articleStore.fetching_in_progress " class="text-xl ml-10 mt-10"> There is no blog </div>

    <div v-if="!articleStore.fetching_in_progress" class="pb-4 border-b a-blog border-b-gray-400"
      v-for="article in articleStore.articles" :key="article.id">
      <div class="flex justify-between">
        <div class="flex items-center mt-5 content">
          <img :src='article.author.image' @click="goToUser(article.author.username)" class="rounded-full cursor-pointer w-11 h-11" alt="pic">
          <section class="ml-2">
            <p @click="goToUser(article.author.username)" class="text-sm cursor-pointer">{{ article.author.username }}</p>
            <p class="text-sm text-gray-700">{{ article.createdAt }}</p>
          </section>
        </div>

        <button @click="favoriteArt(article.slug , article.favorited )" :disabled="articleStore.operation_in_submission" :class="{ 'purple' : article.favorited }"
          class="flex cursor-pointer items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-bloodRed border-bloodRed  transition disabled:cursor-not-allowed">
          <span> {{ article.favoritesCount }} </span>
          <heart-icon />
        </button>
      </div>
      <div @click="goToArticle(article.slug)" class="w-11/12 mt-4 cursor-pointer">
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
import BlogLists from '../BlogLists/BlogLists.vue'

export default {
  name: 'mainContent',

  setup() {
    const articleStore = useArticlesStore();

    return {
      articleStore
    }
  },

  components: {
    UserIcon,
    HeartIcon,
    BlogLists
  },

  data() {
    return {
      artTime: null,
      articles: null,
      path: this.$route.name,
    };
  },

  watch: {
    $route(to, from) {
      this.path = this.$route.name;
      if (this.path === 'home') {
        this.articleStore.getPosts();
      } else {
        this.articleStore.getUserFeed();

      }
    }
  },

  created() {
    this.articleStore.getPosts();

  },


  methods: {
    favoriteArt(slug , IsFavorite) {
      this.articleStore.toggleFav(slug , IsFavorite)
    },

    goToArticle(slug) {
      console.log(slug)
      this.$router.push(`/single-article/${slug}`)
    },
    goToUser(username) {
      console.log(username)
      this.$router.push(`/user-profile/${username}`)
    }

  }

}

</script>

<style>
.purple{
  background-color: #9333ea;
  color: #e9d5ff !important;
}
</style>