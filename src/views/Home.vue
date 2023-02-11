<template> 
<div>
        <top-nav />
        <Header />
</div>
</template>

<script>
import Header from "../components/Header/header.vue"
import TopNav from "../components/Navigation/topNav.vue";
export default{

 name:'theMainPage',
    
components:{
    TopNav,
    Header,
}
}
</script>
<style scoped></style>