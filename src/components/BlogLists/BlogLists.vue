<template>
    <ul class="border-b border-b-gray-400 flex mx-7 md:mx-20">
      <li @click="sendAllBlog" :class="{'colorize' : !userStore.activedBlogs}" class="cursor-pointer font-medium  mr-3 text-gray-400 px-1 transition"> All shared blogs</li>
      <li @click="sendUserBlog" :class="{'colorize' : userStore.activedBlogs}" v-if="token" class="cursor-pointer font-medium ml-3 text-gray-400 px-1 transition">Your feed</li>
    </ul>

    <template v-if="startSkeleton">
        <Suspense>
                <template #default>
                    <component :is="userStore.componentName"></component>
                </template>
                <template #fallback>
                    <main-content-skeleton />
                </template>
        </Suspense> 
    </template>

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
            token: Object.keys(this.userStore.user).length,
            startSkeleton : true,
            componentName : 'allBlogs'

        }
    },

    watch:{
        componentName(newValue , oldValue){
            console.log('component name changed');
            setTimeout(()=>{
                this.startSkeleton = true;

            },100)
        },
        // immediate: true,
        // deep : true
    },
    
    methods:{
        sendAllBlog(){
            this.userStore.activedBlogs = false;
            this.userStore.componentName = 'allBlogs';
            this.componentName = 'allBlogs';

            console.log('component name' , this.userStore.componentName);
            this.startSkeleton = false;
            this.$router.push({ name : 'home' })
        },
        sendUserBlog(){
            this.userStore.activedBlogs = true;
            this.componentName = 'feedBlogs';

            this.userStore.componentName = 'feedBlogs';
            console.log('component name' , this.userStore.componentName);
            this.startSkeleton = false;
            this.$router.push({ name : 'homeFeed' })
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