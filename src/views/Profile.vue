<template>
    <top-nav />

    <div class="space-y-10" v-if="userStore.aProfile">
        <header class="bg-gray-700 my-5 shadow-4xl py-6">
          <div class="mt-4 mx-7 md:mx-20 flex flex-col content-center items-center" >
            <img class="w-24 h-24 rounded-full " :src="userStore.aProfile.image" alt="user image">
            <div class="ml-3 mt-3 space-y-3">
              <p class="text-white text-base" >{{ userStore.aProfile.username }}</p>
              <p class="text-gray-500 text-sm">{{ userStore.aProfile.bio }}</p>
            </div>
          </div>
          <div class="flex justify-end">
          <button class="bg-gray-500 mx-2 rounded px-1 text-xs"> <plus-icon class="inline w-4" /><span> Follow {{ userStore.aProfile.username }}</span></button>
        </div>
        </header>

        <main class="mx-7 md:mx-20">
            <ul class="border-b border-b-gray-400  flex">
              <li @click="sendUserBlog" :class="{'colorize' : !activedBlogs}"  class="cursor-pointer font-medium mr-3 text-gray-400 px-1 ">Your blogs</li>
              <li @click="sendFavoritedBlog" :class="{'colorize' : activedBlogs}" class="cursor-pointer font-medium  ml-3 text-gray-400 px-1"> Favorited blogs </li>
            </ul>

            <div v-if="articleStore.fetching_in_progress" class="text-xl ml-10 mt-10">loading...</div>

            <div v-if="!blog && !articleStore.fetching_in_progress" class="pb-4 border-b a-blog border-b-gray-400"
              v-for="userArticle in articleStore.userArticles" :key="userArticle.id">
                <div class="flex justify-between">
                    <div class="flex items-center mt-5 content">
                      <img @click="goToUser" :src='userArticle.author.image' class="rounded-full cursor-pointer w-11 h-11" alt="pic">
                      <section class="ml-2">
                        <p @click="goToUser" class="text-sm cursor-pointer">{{ userArticle.author.username }}</p>
                        <p class="text-sm text-gray-700">{{ userArticle.createdAt }}</p>
                      </section>
                    </div>
                    <button
                        class="flex cursor-pointer items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-bloodRed border-bloodRed bg-cream">
                        <span> {{ userArticle.favoritesCount }} </span>
                        <heart-icon />
                    </button>
                </div>
                <div @click="goToArticle" class="w-11/12 mt-4 cursor-pointer">
                    <p class="">{{ userArticle.title }}</p>
                    <p class="text-sm text-gray-700">{{ userArticle.description }}</p>
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
      blog : false
    }
  },

  components:{
    TopNav,BlogLists,HeartIcon,PlusIcon
  },

  methods:{
    sendUserBlog(){
      this.activedBlogs = false
      this.blog = false
      this.articleStore.getUserPosts(this.userStore.aProfile.username);
    },
    sendFavoritedBlog(){
      this.activedBlogs = true
      this.blog = true
    }
  },

  created(){
    this.userStore.getProfile(this.$route.params.username)
  },
}
</script>

<style scoped>
.colorize{
  color: #9333ea;
  border-bottom  : 2px solid #9333ea;
}
</style>