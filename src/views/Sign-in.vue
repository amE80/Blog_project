<template>
    <top-nav />
    <section class="font-main">
    
      
      <div class="w-9/12 sm:w-7/12 lg:w-5/12 mx-auto mt-20">
        <p class="text-5xl text-center mb-9 text-brwn font-semibold">Welcome Back! </p>
        <form class="mt-20">
            
         
          
          <div class="mb-6">
            <input
              type="email"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-lightGray focus:border-gray focus:outline-none"
              placeholder="Email address"
            />
          </div>

          
          <div class="mb-6">
            <input
              type="password"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-lightGray focus:border-gray focus:outline-none"
              placeholder="Password"
            />
          </div>

          <div class="flex justify-between ">
            
           <a href="#" class="font-medium hover:underline text-sm md:text-base">Don't have an account? sign up here</a>
                
            
            <button
            type="submit"
            class="w-20 md:w-32 py-4 px-2 text-sm md:text-base font-medium transition bg-brwn text-crm rounded-lg"
           
          >
            Sign In
          </button>

          </div>
     
    
        </form>
      </div>
  
  
</section>
 

</template>

<script>
import TopNav from "../components/Navigation/topNav.vue";
export default {
    name:"signIn",
data(){
    return{

    }
},
components:{
    TopNav,
}
}
</script>