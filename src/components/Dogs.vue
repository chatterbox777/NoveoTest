<template>
  <div>
    <div v-if="isLoading">...Loading</div>
    <div v-if="!isLoading" class="main__dogs">
      <div v-for="imageSrc in dogsImages" :key="imageSrc" class="imagesRow">
        <img :src="imageSrc" alt="dog picture" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Dogs",
  props: {
    msg: String,
  },
  computed: {
    ...mapState("dogs", {
      dogsImages: (state) => state.dogsImages,
      isLoading: (state) => state.isLoading.dogsImages,
    }),
  },
  mounted() {
    this.getAllBreeds();
  },
  methods: {
    ...mapActions("dogs", ["getAllBreeds"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main__dogs {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;

  .imagesRow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 1px solid grey;
    border-radius: 25px;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
