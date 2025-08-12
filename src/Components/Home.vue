<script>
export default{
    data(){
        return{
            showmodel:false
        }
    },
    methods:{
     openForm() {
        this.showmodel= false,
        this.$router.push('/api/users/create'); 
   
},
},
}

</script>
<template>
    <main class="bg-[#002F63]">
       
    </main>
   
</template>
<style scoped>
button{
  padding: 0.75rem 1.25rem;
  margin: 0.825rem 0;
}
</style>