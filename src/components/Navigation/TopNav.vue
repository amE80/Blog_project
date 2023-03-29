<template>
     <nav v-if="userStore.user" class=" w-full h-10 sticky top-0 bg-white     ">
        <ul class="flex items-center justify-between my-3 mx-1 sm:mx-7 md:mx-20">
             <li class=" text-lg sm:text-2xl font-bold md:text-3xl text-mainRed "> <h2> <router-link :to="{name: 'home'}"> Blog Hub </router-link> </h2></li>
         <ul class="flex items-center content-center space-x-2 sm:space-x-4">      
            <li  class="text-xs sm:text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400"><router-link active-class="text-mainRed" :to="{name: 'home'}"> Home </router-link></li>
            <li v-if="user"  class="text-xs sm:text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400 " ><router-link class="flex items-center" :to="{name: 'addBlog'}" active-class="text-mainRed"><pencil-square-icon class="md:w-6 md:h-6 w-5 h-5" />New blog</router-link></li>
            <li v-if="!user" class="text-xs sm:text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400" ><router-link :to="{name: 'signIn'}" active-class="text-mainRed"> Sign in </router-link> </li>
            <li v-if="user"   class="text-xs sm:text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400"><router-link class="flex item-center" :to="{name: 'edit'}" active-class="text-mainRed"><settings-icon class="w-4 h-4 md:w-6 md:h-6" /> Settings </router-link></li>
            <li v-if="!user" class="text-xs sm:text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400"><router-link :to="{name: 'signUp'}" active-class="text-mainRed"> Sign up </router-link></li>
            <li v-if="user"  class="text-xs sm:text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400" ><router-link :to="{path : `/user-profile/${this.user.username}` }" active-class="text-mainRed"> {{ userStore.user.username }} </router-link></li>
        </ul>
          
        </ul>
    </nav>
</template>
<script>
import PencilSquareIcon from '../Icon/pencil-squareIcon.vue'
import SettingsIcon from '../Icon/settingIcon.vue';
import { useUserStore } from "../../stores/User.js";

export default {
    name:'navigationBar',
    setup() {
    const userStore = useUserStore();

    return {
      userStore,
      
    }
  },
  created(){
    this.userStore.getCurrentUser();
  },
    components:{PencilSquareIcon,SettingsIcon},
    data(){
        return{
            user:JSON.parse( localStorage.getItem('user'))
        }
    },
}
</script>
