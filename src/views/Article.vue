<template>
    <top-nav />

    <div v-if="articleStore.wantDelete" class=" w-full bg-backcolor h-screen fixed top-0 left-0 !z-50 flex justify-center">
      <div class="border w-1/3 top-1/3 bg-white rounded-lg absolute opacity-100 !z-40">
       <p class="m-4">Are you sure to delete this blog?</p>
       <div class="text-right">
          <button @click="closeDiv" class="font-semibold p-1 mx-2 text-base transition text-gray-700 rounded-lg border border-gray-500 px-10 hover:bg-gray-300 ">No</button>
          <button @click="deleteBlog" :disabled="articleStore.operation_in_submission" class="disabled:cursor-not-allowed font-semibold py-1 px-10  mx-2 mt-8 mb-2 border-gray-500 text-base transition text-gray-700 rounded-lg border hover:bg-gray-300  disabled:bg-gray-400 ">Yes</button>
       </div>
      </div>
    </div>
    <div v-if="articleStore.wantDeleteComment" class=" w-full bg-backcolor h-screen fixed top-0 left-0 !z-50 flex justify-center">
      <div class="border w-1/3 top-1/2 bg-white rounded-lg absolute opacity-100 !z-40">
       <p class="m-4">Are you sure to delete this comment?</p>
       <div class="text-right">
          <button @click="closeDivComment" class="font-semibold p-1 mx-2 text-base transition text-gray-700 rounded-lg border px-10 border-gray-500 hover:bg-gray-300">No</button>
          <button @click="deleteComment" :disabled="articleStore.operation_in_submission" class="disabled:cursor-not-allowed font-semibold py-1 px-10 border-gray-500 mx-2 mt-8 mb-2 text-base transition text-gray-700 rounded-lg border hover:bg-gray-300  disabled:bg-gray-400 ">Yes</button>
       </div>
      </div>
    </div>

    <div class="space-y-10 mb-5 h-screen !z-10" :class="{'bg-gray-600' : articleStore.wantDelete}" v-if="articleStore.articles.author.image && articleStore.user">
      <header class="bg-gray-700 my-5 shadow-4xl py-6">
        <p class="text-white lg:text-3xl mx-7 text-2xl md:mx-20 sm:text-2xl"> {{ articleStore.articles.title }} </p>
        <div class="mt-4 mx-7 md:mx-20 flex items-center">
          <img class="w-11 h-11 rounded-full cursor-pointer" @click="goToUser(articleStore.articles.author.username)" :src="articleStore.articles.author.image" alt="user image">
          <div class="ml-2 ">
            <p class="text-white text-xs sm:text-sm cursor-pointer" @click="goToUser(articleStore.articles.author.username)" >{{ articleStore.articles.author.username }}</p>
            <p class="text-gray-500 text-xs hidden sm:block">{{ articleStore.articles.createdAt }}</p>
          </div>
          <div class="flex">
            <button v-if="articleStore.articles.author.username !== articleStore.user.username && !articleStore.articles.author.following" :disabled="articleStore.operation_in_submission"  class="bg-gray-500 ml-4 mr-2 rounded px-1 text-xs disabled:cursor-not-allowed" @click="followingReq(articleStore.articles.author.username )"> <plus-icon class="hidden sm:inline w-4" /><span> Follow {{ articleStore.articles.author.username }}</span></button>
            <button v-if="articleStore.articles.author.username !== articleStore.user.username && articleStore.articles.author.following" :disabled="articleStore.operation_in_submission"  class="bg-gray-200 ml-4 mr-2 rounded px-1 text-xs disabled:cursor-not-allowed" @click="followingReq(articleStore.articles.author.username )"> <plus-icon class="hidden sm:inline w-4" /><span> Unfollow {{ articleStore.articles.author.username }}</span></button>


            <button v-if="articleStore.articles.author.username == articleStore.user.username"  :disabled="articleStore.operation_in_submission" class="bg-gray-500 ml-4 mr-2 rounded px-1 text-xs transition disabled:cursor-not-allowed hover:bg-gray-200" @click="openDiv"><span><trash-icon class="hidden sm:inline w-4" /> Delete blog</span></button>
            <button v-if="articleStore.articles.author.username == articleStore.user.username"   class="bg-gray-500 mx-2 rounded px-1 text-xs transition  hover:bg-gray-200" @click="editBlog"><span><PencilSquareIcon class="hidden sm:inline w-4" /> Edit blog</span></button>

            <button @click="favoriteArt(articleStore.articles.slug , articleStore.articles.favorited )" :disabled="articleStore.operation_in_submission" :class="{ 'white' : this.articleStore.articles.favorited }"
             class="bg-gray-500 rounded mx-2 px-1 text-xs transition disabled:cursor-not-allowed"> <heart-icon class="hidden sm:inline w-4" /><span> Favorited blog ({{ articleStore.articles.favoritesCount }}) </span></button>
             <div v-if="articleStore.operation_in_submission" class="loaders"></div>
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
          class="bg-mainRed text-white rounded m-1.5 w-32 disabled:cursor-wait"
          :disabled="articleStore.operation_in_submission_comment"
          >
          <span v-if="!articleStore.operation_in_submission_comment">Comment it!</span>
          <div v-if="articleStore.operation_in_submission_comment" class="loaderCom mx-auto"></div>
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

              <trash-icon v-if="artcomment.author.username == articleStore.user.username" 
                class=" m-1.5 text-gray-700 cursor-pointer  " 
              @click="openDivComment(artcomment.id)
              " />  
          </div>
        </div>
      </Form>
    </footer>
    </div>
</template>


<script >
import { useArticlesStore } from "../stores/Articles";
import TopNav from "../components/Navigation/TopNav.vue";
import TrashIcon from "../components/Icon/trashIcon.vue"
import HeartIcon from "../components/Icon/heartIcon.vue";
import PlusIcon from "../components/Icon/plusIcon.vue";
import PencilSquareIcon from "../components/Icon/pencil-squareIcon.vue";
import { Field, Form, ErrorMessage, useResetForm } from "vee-validate";

export default{
    name:"SingleArticle",
    setup() {
    const articleStore = useArticlesStore();  
    articleStore.getCurrentUser();

    return {
      articleStore,
      
    }
  },
  data(){
    return{
      schema: {
        body: "required",
      },
      comment:{
        body:"",
      },
      artId :null
    }
  },
  components:{
    TopNav,TrashIcon,HeartIcon,PlusIcon,
    Form, Field, ErrorMessage ,PencilSquareIcon
  },
  methods:{
    submitComment(comment){
      console.log(comment)
      this.articleStore.postComments( this.$route.params.slug ,comment = {comment});
      this.comment.body = ''
    },
    openDivComment(id){
      this.articleStore.wantDeleteComment = true
      this.artId = id
    },
    closeDivComment(){
      this.articleStore.wantDeleteComment = false
    },
    deleteComment(){
      this.articleStore.deleteComments(this.$route.params.slug,this.artId)
    },
    followingReq(username){
      this.articleStore.followUser(username)
    },
    favoriteArt(slug , IsFavorite) {
      this.articleStore.toggleArt(slug , IsFavorite)
      console.log(this.articleStore.articles.favorited)
    },
    openDiv(){
      this.articleStore.wantDelete = true
    },
    closeDiv(){
      this.articleStore.wantDelete = false
    },
    deleteBlog(){
      this.articleStore.deleteBlog(this.$route.params.slug)
    },
    editBlog(){
      this.$router.push(`/edit-article/${this.$route.params.slug}`)
    },
    goToUser(username) {
      this.$router.push(`/user-profile/${username}`)
    }

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
.loaderCom{
  border: 2px solid #581c87;
  border-radius: 50%;
  border-top: 2px solid #e9d5ff;
  width: 24px;
  height: 24px;
  animation: spin 0.8s linear infinite;
}
</style>