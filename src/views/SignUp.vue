<template>
    <top-nav />
    <section class="font-main">
    
      
      <div class="w-9/12 sm:w-7/12 lg:w-5/12 mx-auto mt-20">
        <p class="text-5xl text-center mb-9 text-brwn font-semibold">Welcome! </p>
        <Form class="mt-20" :validation-schema="schema">
            
          <div class="mb-6">
            <Field
              name="userName"
              type="text"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-lightGray focus:border-gray focus:outline-none"
              placeholder="User name"
            />
            <ErrorMessage name="userName" class="mt-1 text-red" />
          </div>
          
          <div class="mb-6">
            <Field
              name="email"
              type="email"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-lightGray focus:border-gray focus:outline-none"
              placeholder="Email address"
            />
            <ErrorMessage name="email" class="mt-1 text-red" />

          </div>

          
          <div class="mb-6">
            <Field
              name="password"
              type="password"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-lightGray focus:border-gray focus:outline-none"
              placeholder="Password"
            />
            <ErrorMessage name="password" class="mt-1 text-red" />

          </div>

          <div class="flex justify-between ">
            
           <router-link :to="{name : 'signIn'}" class="font-medium hover:underline text-sm md:text-base">Already have an account? sign in here</router-link> 
                
            
            <button
            type="submit"
            class="w-20 md:w-32 py-4 px-2 text-sm md:text-base font-medium transition bg-brwn text-crm rounded-lg"
           
          >
            Sign Up
          </button>

          </div>
     
    
        </Form>
      </div>
  
  
</section>
 
</template>

<script>
import TopNav from "../components/Navigation/TopNav.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
export default {
    name:"signUp",
    components:{
    TopNav,
    Form, Field, ErrorMessage ,
},
data(){
    return{
      schema: {
        email: "email|required",
        password: "min:6|max:30|required",
        userName: "min:3|max:30|required",
        
      },

    }
},

}


</script>