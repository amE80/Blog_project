<template> 
<div>
        <top-nav />
        <Header />
        <blog-lists />
        <Suspense>
            <template #default>
                <main-content />
            </template>
            <template #fallback>
                <main-content-skeleton />
            </template>
        </Suspense>
</div>
</template>

<script>
import Header from "../components/Header/Header.vue";
import TopNav from "../components/Navigation/TopNav.vue";
import BlogLists from '../components/BlogLists/BlogLists.vue'      
import MainContent from "../components/MainContent/MainContent.vue";
import MainContentSkeleton from "../components/MainContent/MainContentSkeleton.vue";

export default{

 name:'homePage',
    
components:{
    
    MainContentSkeleton,
    TopNav,
    Header,
    MainContent,
    BlogLists,
}
}
</script>
<style scoped></style>