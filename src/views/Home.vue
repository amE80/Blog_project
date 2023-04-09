<template> 
<div>
        <top-nav />
        <Header />
        <blog-lists />
</div>
</template>

<script>
import Header from "../components/Header/Header.vue";
import TopNav from "../components/Navigation/TopNav.vue";
import BlogLists from '../components/BlogLists/BlogLists.vue'      
import MainContent from "../components/MainContent/MainContent.vue";

export default{

 name:'homePage',
    
components:{
    
    TopNav,
    Header,
    MainContent,
    BlogLists,
}
}
</script>
<style scoped></style>