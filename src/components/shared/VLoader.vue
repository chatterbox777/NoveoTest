<template>
  <img :src="Loader" alt="Loader icon" class="class-v-loader" />
</template>

<script>
/**
 ** Shared loader component
 **/

import Loader from "../../assets/loader.svg";

export default {
  data() {
    return {
      Loader,
    };
  },
  name: "VLoader",
};
</script>

<style lang="scss" scoped>
img {
  width: 48px;
  height: 48px;
  //   animation: rotate 1s linear infinite;
}
</style>
