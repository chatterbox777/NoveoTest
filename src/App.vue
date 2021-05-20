<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/favorite">Favorite</router-link>
      <select @change="onChange" v-model="selected">
        <option disabled value="">Choose breed</option>
        <option v-for="breed in breeedsArray" :key="breed">{{ breed }}</option>
      </select>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    ...mapState("dogs", {
      breeds: (state) => state.breeds,
      breeedsArray() {
        return Object.keys(this?.breeds ?? {});
      },
    }),
  },
  mounted() {
    this.getAllBreeds();
  },
  methods: {
    ...mapActions("dogs", ["getAllBreeds", "getDogsImagesByBreed"]),
    async onChange(event) {
      let breedName = event.target.value;
      await this.getDogsImagesByBreed({ breedName });
      this.$router.push({ name: "Dogs" });
    },
  },
};
</script>
<style lang="scss">
>>> .vs__dropdown-toggle {
  display: flex;
  flex-direction: row;
}
#breedSelector {
  display: flex;
  #vs1__listbox {
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px;
  gap: 14px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
