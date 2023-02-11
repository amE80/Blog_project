<template>
  <main class="my-10 mx-7 md:mx-20 font-main">
    <div class="border-b border-b-lightGray">
      <p class="inline font-medium border-b-2 text-brwn">Recently shared</p>
    </div>
    <div class="pb-4 border-b a-blog border-b-lightGray">
    <div class="flex justify-between">
      <div class="flex items-center mt-5 content">
        <div class="rounded-full w-11 h-11 bg-brwn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto mt-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

        </div>
        <section class="ml-2">
          <p class="text-sm">fname lname</p>
          <p class="text-sm text-gray">date</p>
        </section>
      </div>
      <button @click="likeplus" class="flex items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-red border-red hover:bg-red hover:text-crm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 "
        >
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
          />
        </svg>
       <span> {{ like }} </span>
        
      </button>
    </div>
    <div class="w-11/12 mt-4">
    <p class="">Lorem ipsum dolor njedslnf jkndfjksn; nfvjk fdkf sit amet consectetur adipisicing elit. Excepturi dolor deserunt ullam dignissimos omnis porro architecto fuga soluta odit velit!</p>
<p class="text-sm text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem expedita mollitia harum, consequatur unde cum perspiciatis. Quibusdam asperiores temporibus, tempore earum voluptate odit molestiae itaque consequatur modi harum, ipsum at soluta eveniet quis sunt nostrum aut? Iure beatae nesciunt dolor, consectetur rerum officia placeat ut ullam voluptates, provident non qui.</p>
<p class="mt-4 text-sm text-gray" >see more... </p>
</div>
</div>

<div class="pb-4 border-b a-blog border-b-lightGray">
    <div class="flex justify-between">
      <div class="flex items-center mt-5 content">
        <div class="rounded-full w-11 h-11 bg-brwn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto mt-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

        </div>
        <section class="ml-2">
          <p class="text-sm">fname lname</p>
          <p class="text-sm text-gray">date</p>
        </section>
      </div>
      <button @click="likeplus" class="flex items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-red border-red hover:bg-red hover:text-crm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 "
        >
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
          />
        </svg>
       <span> {{ like }} </span>
        
      </button>
    </div>
    <div class="w-11/12 mt-4">
    <p class="">Lorem ipsum dolor njedslnf jkndfjksn; nfvjk fdkf sit amet consectetur adipisicing elit. Excepturi dolor deserunt ullam dignissimos omnis porro architecto fuga soluta odit velit!</p>
<p class="text-sm text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem expedita mollitia harum, consequatur unde cum perspiciatis. Quibusdam asperiores temporibus, tempore earum voluptate odit molestiae itaque consequatur modi harum, ipsum at soluta eveniet quis sunt nostrum aut? Iure beatae nesciunt dolor, consectetur rerum officia placeat ut ullam voluptates, provident non qui.</p>
<p class="mt-4 text-sm text-gray" >see more... </p>
</div>
</div>


<div class="pb-4 border-b a-blog border-b-lightGray">
    <div class="flex justify-between">
      <div class="flex items-center mt-5 content">
        <div class="rounded-full w-11 h-11 bg-brwn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto mt-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

        </div>
        <section class="ml-2">
          <p class="text-sm">fname lname</p>
          <p class="text-sm text-gray">date</p>
        </section>
      </div>
      <button @click="likeplus" class="flex items-center justify-center w-auto h-10 px-2 mt-5 border-2 rounded text-red border-red hover:bg-red hover:text-crm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 "
        >
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
          />
        </svg>
       <span> {{ like }} </span>
        
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
 export default{
    data() {
    return{
        like: 0,
    };
},
methods:{
    likeplus(){
        return this.like++;
    }
}

    }
</script>
