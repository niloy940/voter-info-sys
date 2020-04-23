<template>
    <div></div>
</template>

<script>
    export default {
        created() {
            this.$store
                .dispatch('destroyToken')
                .then(response => {
                    this.$router.push({name:'login'});
                    console.log(response.statusText);
                });
        }
    }
</script>
