<template>
    <div class="placeholder">
       &nbsp; 
    </div>
</template>

<script>
   export default{
       props: {
           height: String,
           width: String,
           borderRadius: String,
       }
   }

</script>
<style scoped>
@keyframes bgAnimate{
    0%{
        background-position: 50% 0;
    }
    100%{
        background-position: -150% 0;
    }
}
.placeholder{
    height: v-bind(height);
    width: v-bind(width);
    border-radius: v-bind(borderRadius);
    background-image: linear-gradient(
        to right,
        #d6d7d8 0%,
        #e2e3e4 10%,
        #d6d7d8 20%,
        #e2e3e4 100%
    );
    background-size: 200% 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) , 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    animation: bgAnimate 1.5s linear infinite;
}

</style>