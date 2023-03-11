<template>
    <div>
        <top-nav />
        Edit
        <p class="cursor-pointer m-10" @click="logOut" >log out</p>
    </div>
</template>
<script>
import TopNav from '../components/Navigation/TopNav.vue'
export default{
    name : 'editUserInfo',
components:{TopNav},
methods:{
    logOut(){
        localStorage.clear()
        this.$router.push({name:'home'})
    }
}
}
</script>