<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/favorite">Favorite</router-link>
      <select
        class="selectBreed"
        @change="onChange"
        v-model="selectedBreedReactive"
      >
        <option disabled value="">Choose breed</option>
        <option v-for="breed in breeedsArray" :key="breed + Date.now()">
          {{ breed }}
        </option>
      </select>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState("dogs", {
      breeds: (state) => state.breeds,
      selectedBreed: (state) => state.selectedBreed,
    }),
    selectedBreedReactive: {
      get() {
        return this.selectedBreed;
      },
      async set(value) {
        this.clearDogsImagesData();
        this.setSelectedBreed({ value });
        debugger;
        await this.getDogsImagesByBreed({ breedName: value });
        this.$router.push({ name: "Dogs" });
      },
    },
    breeedsArray() {
      return Object.keys(this?.breeds ?? {});
    },
  },
  created() {
    this.getAllBreeds();
  },

  methods: {
    ...mapActions("dogs", [
      "getAllBreeds",
      "getDogsImagesByBreed",
      "setSelectedBreed",
      "clearDogsImagesData",
    ]),
    async onChange(event) {
      let breedName = event.target.value;
      this.clearDogsImagesData();
      this.setSelectedBreed({ breedName });
      await this.getDogsImagesByBreed({ breedName });
      this.$router.push({ name: "Dogs" });
    },
  },
};
</script>
<style lang="scss">
.selectBreed {
  font-family: Avenir;
  font-size: 14px;
}
#breedSelector {
  display: flex;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: #636261;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px;
  gap: 14px;
  position: fixed;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  a {
    font-weight: bold;
    color: #fcfdff;

    &.router-link-exact-active {
      color: #4dcfe0;
    }
  }
}
</style>
