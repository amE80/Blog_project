<template>
     <nav class="my-3 mx-7 md:mx-20 ">
        <ul class="flex items-center justify-between">
             <li class="text-2xl font-bold md:text-3xl text-brwn "> <h2> <router-link :to="{name: 'home'}"> Blog Hub </router-link> </h2></li>
           <ul class="flex items-center justify-between w-40 sm:w-48">      
            <li  class="text-sm cursor-pointer md:text-base hover:text-brwn font-main text-lightGray"><router-link active-class="text-brwn" :to="{name: 'home'}"> Home </router-link></li>
            <li  class="text-sm cursor-pointer md:text-base hover:text-brwn font-main text-lightGray" ><router-link :to="{name: 'signIn'}" active-class="text-brwn"> Sign in </router-link> </li>
            <li  class="text-sm cursor-pointer md:text-base hover:text-brwn font-main text-lightGray"><router-link :to="{name: 'signUp'}" active-class="text-brwn"> Sign up </router-link></li>
        </ul>
          
        </ul>
    </nav>
</template>
<script>

export default {
    name:'navigationBar',
    methods:{
       
    }
    
}
</script>
