<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <DogsMain msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import DogsMain from "@/components/DogsMain.vue";

export default {
  name: "Home",
  components: {
    DogsMain,
  },
};
</script>
