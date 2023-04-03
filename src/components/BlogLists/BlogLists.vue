<template>
    <ul class="border-b border-b-gray-400 flex mx-7 md:mx-20">
      <li @click="sendAllBlog" :class="{'colorize' : !activedBlogs}" class="cursor-pointer font-medium  mr-3 text-gray-400 px-1"> All shared blogs</li>
      <li @click="sendUserBlog" :class="{'colorize' : activedBlogs}" v-if="token" class="cursor-pointer font-medium ml-3 text-gray-400 px-1 ">Your feed</li>
    </ul>
</template>
<script>

import { useUserStore } from "../../stores/User.js";

export default{
    name : 'listsOfBlogs',

    setup(){
        const userStore = useUserStore();
            userStore.getCurrentUser()
    return{
      userStore
    }
  },    
     data(){
        return{
         activedBlogs: false,
         token: localStorage.getItem('token'),
         username:null,
         userInformation :JSON.parse(localStorage.getItem('user')),
          }
    }  ,
    methods:{
        sendAllBlog(){
            this.activedBlogs = false;
            this.$router.push({name:'home'})
        },
        sendUserBlog(){
            this.username = this.userInformation.username;
            this.activedBlogs = true;
            this.$router.push({ name: 'user_article', query: {author:this.username}})
        }
    }
}
</script>
<style scoped>
.colorize{
    color: #9333ea;
    border-bottom  : 2px solid #9333ea;
}
</style>