<template>
    <ul class="border-b border-b-gray-400 flex">
      <li @click="sendAllBlog" :class="{'colorize' : !activedBlogs}" class="cursor-pointer font-medium  mr-3 text-gray-400 px-1"> All shared blogs</li>
      <li @click="sendUserBlog" :class="{'colorize' : activedBlogs}" v-if="token" class="cursor-pointer font-medium ml-3 text-gray-400 px-1 ">Your blogs</li>
    </ul>
</template>
<script>
import { useUserStore } from "../../stores/User.js";
     export default{
        setup(){
    const userStore = useUserStore();
    return{
      userStore
    }
  },
        
        name : 'listsOfBlogs',
        created(){
            this.userStore.getProfile()
        },
     data(){
        return{
         token:localStorage.getItem('token'),
         activedBlogs: false,
         username:null
          }
    }  ,
    methods:{
        sendAllBlog(){
            this.activedBlogs = false;
            this.$emit('relateBlogs',this.activedBlogs)
        },
        sendUserBlog(){
            this.username = this.userStore.user.username;
            this.activedBlogs = true;
            this.$emit('relateBlogs',this.activedBlogs);
            this.$router.push({query: { author: this.username } })
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