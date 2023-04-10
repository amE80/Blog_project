<template>
    <ul class="border-b border-b-gray-400 flex mx-7 md:mx-20">
      <li @click="sendAllBlog" :class="{'colorize' : !activedBlogs}" class="cursor-pointer font-medium  mr-3 text-gray-400 px-1 transition"> All shared blogs</li>
      <li @click="sendUserBlog" :class="{'colorize' : activedBlogs}" v-if="token" class="cursor-pointer font-medium ml-3 text-gray-400 px-1 transition">Your feed</li>
    </ul>
    <Suspense>
            <template #default>
                <component :is="componentName"></component>
            </template>
            <template #fallback>
                <main-content-skeleton />
            </template>
    </Suspense> 

</template>
<script>
import MainContentSkeleton from "./MainContentSkeleton.vue";
import AllBlogs from "./AllBlogs.vue";
import FeedBlogs from "./FeedBlogs.vue";
import { useUserStore } from "../../stores/User.js";

export default{
    name : 'listsOfBlogs',
    components:{
        FeedBlogs , AllBlogs , MainContentSkeleton
    },

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
            token: this.userStore.user.token,
            username:null,
            userInformation : this.userStore.user,
            componentName : 'allBlogs'
        }
    },
    
    methods:{
        sendAllBlog(){
            this.activedBlogs = false;
            this.componentName = 'allBlogs';
        },
        sendUserBlog(){
            this.username = this.userInformation.username;
            this.activedBlogs = true;
            this.componentName = 'feedBlogs';
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