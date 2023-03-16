<template>
    <div>
        <top-nav />
        <Form class="w-4/5 sm:w-3/5 lg:w-2/5 space-y-4 mx-auto mt-16 " :validation-schema="schema" @submit="submitBlog(article)">
            <Field type="text" v-model="article.title" name="title" class="block w-full px-2 py-2 text-xs md:text-sm font-semibold transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Type your title here" />
              <ErrorMessage name="title" class="mt-1 text-red-800" />

            <Field type="text" v-model="article.description" name="description" class="block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="what's this blog about" />
              <ErrorMessage name="description" class="mt-1 text-red-800" />

            <Field as="textarea" type="text" v-model="article.body" name="body" class="text-area block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Write your blog ..."/>
              <ErrorMessage name="body" class="mt-1 text-red-800" />

              <input type="text" v-model="article.tagList" name="tagList" class="block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Enter tags"/>

              <button
            type="submit"
            class="mt-5 w-24 font-semibold py-2 float-right text-base transition bg-mainRed text-cream rounded-lg">
            Share it!
          </button>
        </Form>
    </div>
</template>
<script >
import { Field, Form, ErrorMessage } from "vee-validate";
import TopNav from '../components/Navigation/TopNav.vue';
import { useArticlesStore } from "../stores/Articles.js";
export default{
    name : 'addBlog',
components:{TopNav,Field, Form, ErrorMessage},
  setup(){
    const articleStore = useArticlesStore();

    return{
      articleStore
    }
  },
  data(){
    return{
      schema:{
        title:"required",
        description:"required",
        body:"required",
      },
      article:{},
    }
  },
  methods:{
    submitBlog(article){
     console.log(article)
      this.articleStore.shareBlog(article)
    }
  }
}
</script>
<style scoped>
.text-area{
    min-height: 10rem;
    max-height: 25rem;
}
</style>