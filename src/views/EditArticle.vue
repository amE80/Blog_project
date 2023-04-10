<template>
    <div>
        <top-nav />
        
        <Form class="w-4/5 sm:w-3/5 lg:w-2/5 space-y-4 mx-auto mt-16 " :validation-schema="schema" @submit="submitBlogInfo">
            <Field type="text" v-model="articleStore.articles.title" name="title" class="block w-full px-2 py-2 text-xs md:text-sm font-semibold transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Type your title here" />
              <ErrorMessage name="title" class="mt-1 text-red-800" />

            <Field type="text" v-model="articleStore.articles.description" name="description" class="block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="what's this blog about" />
              <ErrorMessage name="description" class="mt-1 text-red-800" />

            <Field as="textarea" type="text" v-model="articleStore.articles.body" name="body" class="text-area block w-full px-2 py-2 text-xs md:text-sm font-normal transition bg-white border border-solid rounded border-gray-400 focus:border-gray-700 focus:outline-none"
              placeholder="Write your blog ..."/>
              <ErrorMessage name="body" class="mt-1 text-red-800" />

              <button
                type="submit"
                :disabled="articleStore.operation_in_submission"
                class="mt-5 w-24 font-semibold py-3 disabled:py-2 float-right text-base transition bg-mainRed text-cream rounded-lg disabled:cursor-not-allowed">
                <span v-if="!articleStore.operation_in_submission">Share it!</span>
                <div v-if="articleStore.operation_in_submission" class="loader mx-auto"></div>
              </button>
        </Form>
    </div>
</template>
<script >
import { Field, Form, ErrorMessage } from "vee-validate";
import TopNav from '../components/Navigation/TopNav.vue';
import { useArticlesStore } from "../stores/Articles.js";
export default{
    name : 'editBlog',
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
    submitBlogInfo(article){
      this.articleStore.updateBlog(this.$route.params.slug , article={article})
    }
  },
  created(){
    this.articleStore.getAnArticle(this.$route.params.slug)
  }

}
</script>
<style scoped>
.text-area{
    min-height: 10rem;
    max-height: 25rem;
}
</style>