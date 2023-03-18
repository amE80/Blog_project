<template>
     <nav class="my-3 mx-7 md:mx-20 ">
        <ul class="flex items-center justify-between">
             <li class="text-2xl font-bold md:text-3xl text-mainRed "> <h2> <router-link :to="{name: 'home'}"> Blog Hub </router-link> </h2></li>
            <ul class="flex items-center justify-between space-x-4">      
            <li  class="text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400"><router-link active-class="text-mainRed" :to="{name: 'home'}"> Home </router-link></li>
            <li v-if="user"  class="text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400 " ><router-link class="flex content-center" :to="{name: 'addBlog'}" active-class="text-mainRed"><pencil-square-icon class="" />New blog</router-link></li>
            <li v-if="!user" class="text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400" ><router-link :to="{name: 'signIn'}" active-class="text-mainRed"> Sign in </router-link> </li>
            <li v-if="user"   class="text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400"><router-link class="flex content-center" :to="{name: 'edit'}" active-class="text-mainRed"><settings-icon /> Settings </router-link></li>
            <li v-if="!user" class="text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400"><router-link :to="{name: 'signUp'}" active-class="text-mainRed"> Sign up </router-link></li>
            <li v-if="user"  class="text-sm cursor-pointer md:text-base hover:text-mainRed font-main text-gray-400" ><a @click="goToProfile" active-class="text-mainRed"> {{ user.username }} </a></li>
        </ul>
          
        </ul>
    </nav>
</template>
<script>
import PencilSquareIcon from '../Icon/pencil-squareIcon.vue'
import SettingsIcon from '../Icon/settingIcon.vue'
export default {
    name:'navigationBar',
    components:{PencilSquareIcon,SettingsIcon},
    data(){
        return{
            user:JSON.parse( localStorage.getItem('user'))
        }
    },
    methods:{
        goToProfile(){
            this.$router.push(`/user-profile/${this.user.username}`)
        }
    }
}
</script>
