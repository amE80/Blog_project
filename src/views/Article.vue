<template>
    <h1>Heelo woofdhuigbubivu</h1>
</template>


<script>
import { useArticlesStore } from "../stores/Articles";

export default{
    name:"SingleArticle",
    setup() {
    const articleStore = useArticlesStore();

    return {
      articleStore
    }
  },

  created(){
    this.articleStore.getAnArticle(this.$route.params.slug)
  }
}
</script>