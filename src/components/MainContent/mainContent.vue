<template>
  <main class="my-10 mx-7 md:mx-20 font-main">
    <div class="border-b border-b-lightGray">
      <p class="inline font-medium border-b-2 text-brwn">Recently shared</p>
    </div>
    <div class="pb-4 border-b a-blog border-b-lightGray">
    <div class="flex justify-between">
      <div class="flex items-center mt-5 content">
        <div class="rounded-full w-11 h-11 bg-brwn">
          <UserIcon />

        </div>
        <section class="ml-2">
          <p class="text-sm">fname lname</p>
          <p class="text-sm text-gray">date</p>
        </section>
      </div>
      <button @click="increaseLike" class="flex items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-red border-red hover:bg-red hover:text-crm">
        
       <span> {{ like }} </span>
       <heart-icon />
      </button>
    </div>
    <div class="w-11/12 mt-4">
    <p class="">Lorem ipsum dolor njedslnf jkndfjksn; nfvjk fdkf sit amet consectetur adipisicing elit. Excepturi dolor deserunt ullam dignissimos omnis porro architecto fuga soluta odit velit!</p>
<p class="text-sm text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem expedita mollitia harum, consequatur unde cum perspiciatis. Quibusdam asperiores temporibus, tempore earum voluptate odit molestiae itaque consequatur modi harum, ipsum at soluta eveniet quis sunt nostrum aut? Iure beatae nesciunt dolor, consectetur rerum officia placeat ut ullam voluptates, provident non qui.</p>
<p class="mt-4 text-sm text-gray" >see more... </p>
</div>
</div>




 </main>
</template>

<script>
import UserIcon from '../Icon/userIcon.vue';
import HeartIcon from '../Icon/heartIcon.vue';

 export default{
  name:'mainContent',
    data() {
    return{
        like: 0,
    };
},
methods:{
  increaseLike(){
        return this.like++;
    }
},
components:{
  UserIcon,
  HeartIcon,
}

    }
</script>
