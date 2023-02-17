<template> 
<div>
        <top-nav />
        <Header />
        <main-content />
        
</div>
</template>

<script>
import Header from "../components/Header/Header.vue";
import TopNav from "../components/Navigation/TopNav.vue";
import MainContent from "../components/MainContent/MainContent.vue";

export default{

 name:'homePage',
    
components:{
    
    TopNav,
    Header,
    MainContent,
}
}
</script>
<style scoped></style>