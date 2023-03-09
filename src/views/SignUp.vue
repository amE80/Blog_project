<template>
    <top-nav />
    <section class="font-main">
    
      
      <div class="w-9/12 sm:w-7/12 lg:w-5/12 mx-auto mt-20">
        <p class="text-5xl text-center mb-9 text-mainRed font-semibold">Welcome! </p>
        <div class="text-white text-center font-bold p-4 mb-4 rounded"
        v-if="this.userStore.operation_show_alert"
        :class="this.userStore.operation_alert_variant"
        >
          {{ userStore.operation_alert_msg }}
        </div>
        <div v-if="userStore.errorMassage" class="bg-red-500 p-4 rounded"
        >
         <p v-for="(value,index) in userStore.errorMassage" :key="index" class=" text-white text-center font-bold">the {{ value[0] + " "+ value[1] }}</p>
        </div>
        <Form class="mt-10 space-y-6" :validation-schema="schema" @submit="submitRegister">
            
          <div class="">
            <Field
              v-model="user.username"
              name="username"
              type="text"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="User name*"
            />
            <ErrorMessage name="username" class="mt-1 text-red-800" />
          </div>
          
          <div class="">
            <Field
            v-model="user.email"
              name="email"
              type="email"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Email address*"
            />
            <ErrorMessage name="email" class="mt-1 text-red-800" />

          </div>

          
          <div class="">
            <Field
            v-model="user.password"
              name="password"
              type="password"
              class="block w-full px-4 py-2 text-lg md:text-xl font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Password*"
            />
            <ErrorMessage name="password" class="mt-1 text-red-800" />

          </div>

          <div class="flex justify-between items-center">
            
           <router-link :to="{name : 'signIn'}" class="font-medium hover:underline text-sm md:text-base">Already have an account? sign in here</router-link> 
                
            
            <button
            type="submit"
            class="w-20 md:w-32 font-semibold py-3 px-1 text-sm md:text-base transition bg-mainRed text-cream rounded-lg"
            :disabled="this.userStore.operation_in_submission"
          >
            Sign Up
          </button>

          </div>
     
    
        </Form>
      </div>
  
  
</section>
 
</template>

<script>
import { useUserStore } from "../stores/User.js";
import TopNav from "../components/Navigation/TopNav.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
export default {
     name:"signUp",
    setup(){
    const userStore = useUserStore();
    return{
      userStore
    }
  },
    components:{
    TopNav,
    Form, Field, ErrorMessage ,
},
data(){
    return{
      user:{
        'username':"",
        'email':"",
        'password':"",
      },
      schema: {
        email: "email|required",
        password: "min:6|max:30|required",
        username: "min:3|max:30|required",
      },
      
    }
},
methods:{
  submitRegister(user){
    this.userStore.register({user})
  },
  
},


}


</script>