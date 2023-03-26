<template>
    <top-nav />

    <div class="space-y-10 mb-5" v-if="articleStore.articles.author">
      <header class="bg-gray-700 my-5 shadow-4xl py-6">
        <p class="text-white lg:text-3xl mx-7 text-lg md:mx-20 sm:text-2xl"> {{ articleStore.articles.title }} </p>
        <div class="mt-4 mx-7 md:mx-20 flex items-center">
          <img class="w-11 h-11 rounded-full " :src="articleStore.articles.author.image" alt="user image">
          <div class="ml-2 ">
            <p class="text-white text-xs sm:text-sm " >{{ articleStore.articles.author.username }}</p>
            <p class="text-gray-500 text-xs hidden sm:block">{{ articleStore.articles.createdAt }}</p>
          </div>
          <div>
            <button v-if="articleStore.articles.author.username !== articleStore.user.username" :disabled="articleStore.operation_in_submission" :class="{'white' : articleStore.articles.author.following}" class="bg-gray-500 mx-2 rounded px-1 text-xs transition disabled:cursor-not-allowed" @click="followingReq(articleStore.articles.author.username )"> <plus-icon class="inline w-4" /><span> Follow {{ articleStore.articles.author.username }}</span></button>
            <button @click="favoriteArt(articleStore.articles.slug , articleStore.articles.favorited )" :disabled="articleStore.operation_in_submission" :class="{ 'white' : this.articleStore.articles.favorited }"
             class="bg-gray-500 rounded mx-2 px-1 text-xs transition disabled:cursor-not-allowed"> <heart-icon class="inline w-4" /><span> Favorited blog ({{ articleStore.articles.favoritesCount }}) </span></button>
          </div>
        </div>
      </header>

      <main class="mx-7 md:mx-20 border-b pb-10 border-gray-400">
        <p v-html="articleStore.articles.body" class="mb-8"></p>
        <p v-for="tag in articleStore.articles.tagList" class="bg-gray-300 p-1 rounded inline mx-1 text-gray-700" >{{ tag }}</p>
      </main>

      <footer>
        <div class="text-white text-center font-bold p-1 mb-1 mx-auto rounded w-2/4 lg:w-2/6"
          v-if="articleStore.operation_show_alert"
          :class="articleStore.operation_alert_variant">
          {{ articleStore.operation_alert_msg }}
        </div>

        <ErrorMessage name="comment" class="mt-1 text-red-800" />

        <Form class="" :validation-schema="schema" @submit="submitComment(comment)">

        <Field as="textarea" name="comment" type="text" v-model="comment.body" 
          class="text-area mx-auto block rounded-t-lg pl-3 pt-3 text-sm border border-gray-400  w-2/3 sm:w-2/4 lg:w-2/6 focus:border-gray-700 focus:outline-none"
          placeholder="write your comment ... " />
        <div class="bg-gray-400 h-10 mx-auto flex justify-between mb-4 rounded-b-lg w-2/3 sm:w-2/4 lg:w-2/6"><img class="w-8 h-8 m-1 rounded-full" :src="articleStore.user.image" alt="user profile"> 
          <button @click="submitComment(comment)" 
          class="bg-mainRed text-white rounded m-1.5 px-1  disabled:bg-gray-400 disabled:cursor-wait"
          :disabled="articleStore.operation_in_submission"
          >
          Comment it!
          </button> 
        </div>

        <div class="contain" v-if="articleStore.allComments" v-for="artcomment in articleStore.allComments" :key="articleStore.allComments.id">
              <div  class="text-area mx-auto block rounded-t-lg pl-3 pt-3 text-sm border border-gray-400 w-2/3 sm:w-2/4 lg:w-2/6 ">
                {{ artcomment.body }} 
              </div>
           <div class="bg-gray-400 h-10 mx-auto flex justify-between mb-4 rounded-b-lg w-2/3 sm:w-2/4 lg:w-2/6">
                <div class="flex items-center content-center space-x-2">
                  <img class="w-8 h-8 ml-1 rounded-full" :src="artcomment.author.image" alt="user profile">
                  <p class="text-xs text-gray-700">{{ artcomment.author.username }}</p>
                  <p class="text-xs text-gray-500">{{ artcomment.createdAt }}</p>
                </div>

              <trash-icon :class="{ 'dis-icon' : articleStore.operation_in_submission}"
              class=" m-1.5 text-gray-700 cursor-pointer  " 
              @click="deleteComment(artcomment.id)" />  
          </div>
        </div>
      </Form>
    </footer>
    </div>
</template>


<script>
import { useArticlesStore } from "../stores/Articles";
import { useUserStore } from "../stores/User";
import TopNav from "../components/Navigation/TopNav.vue";
import TrashIcon from "../components/Icon/trashIcon.vue"
import HeartIcon from "../components/Icon/heartIcon.vue";
import PlusIcon from "../components/Icon/plusIcon.vue";
import { Field, Form, ErrorMessage, useResetForm } from "vee-validate";

export default{
    name:"SingleArticle",
    setup() {
    const articleStore = useArticlesStore();  
    const userStore = useUserStore();
    articleStore.getCurrentUser();

    return {
      articleStore,
      userStore
    }
  },
  data(){
    return{
      schema: {
        body: "required",
      },
      comment:{
        body:"",
      }
    }
  },
  components:{
    TopNav,TrashIcon,HeartIcon,PlusIcon,
    Form, Field, ErrorMessage ,
  },
  methods:{
    submitComment(comment){
      console.log(comment)
      this.articleStore.postComments( this.$route.params.slug ,comment = {comment});
      this.comment.body = ''
    },
    deleteComment(id){
      this.articleStore.deleteComments(this.$route.params.slug,id)
    },
    followingReq(username){
      this.articleStore.followUser(username)
    },
    favoriteArt(slug , IsFavorite) {
      this.articleStore.toggleArt(slug , IsFavorite)
      console.log(this.articleStore.articles.favorited)
    },
  },

  created(){
    this.articleStore.getAnArticle(this.$route.params.slug);
    this.articleStore.getComments(this.$route.params.slug);
  },

}

</script>
<style scoped>
.white{
  background-color: lightgray !important;
}
.text-area{
    min-height: 8rem;
    max-height: 30rem;
}
.dis-icon{
  color: rgba(220, 220, 220, 0.768);
  cursor: wait ;
}
</style>