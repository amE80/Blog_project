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
          <div class="flex mx-6 justify-end">
            <div v-if="userStore.operation_in_submission" class="loaders inline"></div>
            <button v-if="userStore.user.username !== this.$route.params.username && !userStore.aProfile.following" :disabled="userStore.operation_in_submission"  class="bg-gray-500 flex items-center justify-center w-auto px-2 mx-2 rounded text-xs transition disabled:cursor-wait" @click="followingReq(userStore.aProfile.username )"> <plus-icon class="inline w-4" />
              <span> Follow {{ userStore.aProfile.username }}</span>
            </button>
            <button v-if="userStore.user.username !== this.$route.params.username && userStore.aProfile.following" :disabled="userStore.operation_in_submission" class="bg-gray-200 flex items-center justify-center w-aut px-2 mx-2 rounded text-xs transition disabled:cursor-wait" @click="followingReq(userStore.aProfile.username )"> <plus-icon class="inline w-4" />
              <span> Unfollow {{ userStore.aProfile.username }}</span>
            </button>
          

          <router-link v-if="userStore.user.username == this.$route.params.username"  class="bg-gray-500 mx-8 rounded p-2 text-xs transition hover:bg-gray-200" :to="{name: 'edit'}"> Edit profile </router-link>

        </div>
        </header>

        <main class="">
            <ul class="border-b border-b-gray-400 mx-7 md:mx-20 flex">
              <li @click="sendUserBlog" :class="{'colorize' : !activedBlogs}"  class="cursor-pointer font-medium mr-3 text-gray-400 px-1 ">User blogs</li>
              <li @click="sendFavoritedBlog" :class="{'colorize' : activedBlogs}" class="cursor-pointer font-medium  ml-3 text-gray-400 px-1"> Favorited blogs </li>
            </ul>
            <Suspense>
              <template #default>
                  <component :is="componentName"></component>
              </template>
              <template #fallback>
                  <main-content-skeleton />
              </template>
            </Suspense> 
      </main>
    </div>
</template>


<script >
import { useUserStore } from "../stores/User";
import { useArticlesStore } from "../stores/Articles";
import MainContentSkeleton from "../components/BlogLists/MainContentSkeleton.vue";
import TopNav from "../components/Navigation/TopNav.vue";
import HeartIcon from "../components/Icon/heartIcon.vue";
import PlusIcon from "../components/Icon/plusIcon.vue";
import UserBlogs from "../components/ProfileBlogComponents/UserBlogs.vue";
import FavBlogs from "../components/ProfileBlogComponents/FavBlogs.vue";
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
      componentName :'userBlogs'
    }
  },

  components:{
    TopNav,HeartIcon,PlusIcon,
    MainContentSkeleton,UserBlogs,FavBlogs
  },

  methods:{
    sendUserBlog(){
      this.activedBlogs = false
      this.componentName = 'userBlogs'
    },
    sendFavoritedBlog(){
      this.activedBlogs = true;
      this.componentName = 'favBlogs'  
    },
    followingReq(username){
      this.userStore.followUser(username)
    },
    favoriteArt(slug , IsFavorite) {
      this.articleStore.toggleFav(slug , IsFavorite)
    },
  },

  created(){
    this.userStore.getProfile(this.$route.params.username);
    this.userStore.getCurrentUser()
  },
  watch: {
   $route(to , from){
    this.userStore.getProfile(this.$route.params.username);
    }
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
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loaders{
  border: 2px solid #581c87;
  border-radius: 50%;
  border-top: 2px solid #e9d5ff;
  width: 22px;
  height: 22px;
  animation: spin 0.8s linear infinite;
}
</style>