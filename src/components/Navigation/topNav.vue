<template>
     <nav class="my-3 mx-7 md:mx-20 ">
        <ul class="flex items-center justify-between">
             <li class="text-2xl font-bold md:text-3xl text-brwn "> <h2> Blog Hub </h2></li>
           <ul class="flex items-center justify-between w-40 sm:w-48">      
            <li @click="goToHome" class="text-sm cursor-pointer md:text-base hover:text-brwn font-main text-gray">Home </li>
            <li @click="goToSignIn" class="text-sm cursor-pointer md:text-base hover:text-brwn font-main text-gray" >Sign in </li>
            <li @click="goToSignUp" class="text-sm cursor-pointer md:text-base hover:text-brwn font-main text-gray">Sign up </li>
        </ul>
          
        </ul>
    </nav>
</template>
<script>

export default {
    name:'navigationBar',
    methods:{
        goToHome(){
            this.$router.push('/');
        },
        goToSignIn(){
            this.$router.push('/sign-in');
        },
        goToSignUp(){
            this.$router.push('/sign-up');
        },
    }
    
}
</script>