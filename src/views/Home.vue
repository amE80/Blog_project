<template> 
<div>
        <top-nav />
        <Header />
        <main-content />
</div>
</template>

<script>
import Header from "../components/Header/header.vue";
import TopNav from "../components/Navigation/topNav.vue";
import MainContent from "../components/MainContent/mainContent.vue";
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