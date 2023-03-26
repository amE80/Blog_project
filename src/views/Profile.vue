<template>
    <top-nav />

    <div class="space-y-10" v-if="userStore.aProfile">
        <header class="bg-gray-700 my-5 shadow-4xl py-6">
          <div class="mt-4 mx-7 md:mx-20 " >
            <img class="w-28 h-28 rounded-full mx-auto " :src="userStore.aProfile.image" alt="user image">
            <div class="ml-3 mt-3 space-y-3 text-center">
              <p class="text-white text-base" >{{ userStore.aProfile.username }}</p>
              <p class="text-gray-500 text-sm ">{{ userStore.aProfile.bio }}</p>
            </div>
          </div>
          <div class="flex justify-end">
          <button v-if="userStore.user.username !== this.$route.params.username" :disabled="userStore.operation_in_submission" :class="{'white' : userStore.aProfile.following}" class="bg-gray-500 mx-2 rounded px-1 text-xs transition disabled:cursor-wait" @click="followingReq(userStore.aProfile.username )"> <plus-icon class="inline w-4" /><span> Follow {{ userStore.aProfile.username }}</span></button>
          <button v-if="userStore.user.username == this.$route.params.username"  class="bg-gray-500 mx-8 rounded p-2 text-xs transition hover:bg-gray-200"><router-link :to="{name: 'edit'}"> Edit profile </router-link></button>

        </div>
        </header>

        <main class="mx-7 md:mx-20">
            <ul class="border-b border-b-gray-400  flex">
              <li @click="sendUserBlog" :class="{'colorize' : !activedBlogs}"  class="cursor-pointer font-medium mr-3 text-gray-400 px-1 ">Your blogs</li>
              <li @click="sendFavoritedBlog" :class="{'colorize' : activedBlogs}" class="cursor-pointer font-medium  ml-3 text-gray-400 px-1"> Favorited blogs </li>
            </ul>

            <div v-if="articleStore.fetching_in_progress" class="text-xl ml-10 mt-10">loading...</div>
            <div v-if="articleStore.articles.length == 0 && !articleStore.fetching_in_progress" class="text-xl ml-10 mt-10"> There is no blog </div>

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
    </div>
</template>


<script >
import { useUserStore } from "../stores/User";
import { useArticlesStore } from "../stores/Articles";
import TopNav from "../components/Navigation/TopNav.vue";
import BlogLists from "../components/BlogLists/BlogLists.vue";
import HeartIcon from "../components/Icon/heartIcon.vue";
import PlusIcon from "../components/Icon/plusIcon.vue";

export default{
    name:"userProfile",
    setup() {
    const userStore = useUserStore();
    const articleStore = useArticlesStore();


    return {
      userStore,
      articleStore
    }
  },
  data(){
    return{
      activedBlogs : false,
    }
  },

  components:{
    TopNav,BlogLists,HeartIcon,PlusIcon
  },

  methods:{
    sendUserBlog(){
      this.activedBlogs = false
      this.articleStore.getUserPosts(this.userStore.aProfile.username);
    },
    sendFavoritedBlog(){
      this.activedBlogs = true
      this.articleStore.getFavPosts(this.userStore.aProfile.username);
    },
    followingReq(username){
      this.userStore.followUser(username)
    },
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
  },

  created(){
    this.articleStore.getUserPosts(this.$route.params.username);
    this.userStore.getProfile(this.$route.params.username);
    this.userStore.getCurrentUser()
  },
}
</script>

<style scoped>
.colorize{
  color: #9333ea;
  border-bottom  : 2px solid #9333ea;
}

.white{
  background-color: white;
}
</style>