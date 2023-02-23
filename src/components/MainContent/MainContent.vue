<template>
  <main class="my-10 mx-7 md:mx-20 font-main">
    <div class="border-b border-b-lightGray">
      <p class="inline font-medium border-b-2 text-brwn">Recently shared</p>
    </div>
    <div class="pb-4 border-b a-blog border-b-lightGray" v-for="article in articles" :key="article.id">
    <div class="flex justify-between">
      <div class="flex items-center mt-5 content">
        <div class="rounded-full w-11 h-11 bg-brwn">
          <UserIcon />

        </div>
        <section v-if="article.author" class="ml-2">
          <p class="text-sm">{{ article.author.username }}</p>
          <p class="text-sm text-gray">{{ article.createdAt }}</p>
        </section>
      </div>
      <button @click="increaseLike" class="flex items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-red border-red hover:bg-red hover:text-crm">
        
       <span> {{ article.favoritesCount }} </span>
       <heart-icon />
      </button>
    </div>
    <div class="w-11/12 mt-4" >
    <p class="">{{ article.title }}</p>
<p class="text-sm text-gray">{{ article.description }}</p>
<p class="mt-4 text-sm text-gray" >see more... </p>
</div>
</div>




 </main>
</template>

<script>
import UserIcon from '../Icon/userIcon.vue';
import HeartIcon from '../Icon/heartIcon.vue';
import axios from 'axios';

 export default{

  name:'mainContent',
  components:{
  UserIcon,
  HeartIcon,
},
    data() {
    return{
        like: 0,
        articles: null,
    };
},
created(){
  this.getPosts();
},
methods:{
  increaseLike(){
        return this.like++;
    },
    getPosts (){
  axios.get('https://api.realworld.io/api/articles/')
  .then((response) => {
    // handle success
  this.articles = response.data.articles;
  console.log(response.data.articles)
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}
    
},


    }
</script>
