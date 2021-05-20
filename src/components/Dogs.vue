<template>
  <div class="main">
    <div class="main__dogs">
      <div v-for="imageSrc in dogsImages" :key="imageSrc" class="imagesRow">
        <img :src="imageSrc" alt="dog picture" />
        <img
          :src="getFavouriteImage"
          alt="favourite"
          class="favIcon"
          :class="{ shown: isFavouriteShown, favActive: isFavouriteActive }"
        />
      </div>
    </div>
    <infinite-loading
      :distance="200"
      @infinite="infiniteHandler"
    ></infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import favEmpty from "../assets/favEmpty.svg";
export default {
  name: "Dogs",
  data() {
    return {
      favEmpty,
      isFavouriteShown: true,
      isFavouriteActive: false,
    };
  },
  components: {
    InfiniteLoading,
  },

  props: {
    msg: String,
  },
  computed: {
    ...mapState("dogs", {
      dogsImages: (state) => state.dogsImages,
      isLoading: (state) => state.isLoading.dogsImages,
      selectedBreed: (state) => state.selectedBreed,
      activeState: (state) => state.activeState,
    }),
    getFavouriteImage() {
      return favEmpty;
    },
  },
  mounted() {
    this.getAllBreeds();
  },
  methods: {
    ...mapActions("dogs", ["getAllBreeds", "getDogsImagesByBreed"]),
    async infiniteHandler($state) {
      debugger;
      let that = this;
      window.infiniteState = $state;

      if (
        that.activeState !== "noMoreDataAvailable" &&
        that.activeState !== "loading"
      ) {
        that.getDogsImagesByBreed({ breedName: that.selectedBreed });
        window.infiniteState.loaded();
      } else if (that.activeState === "noMoreDataAvailable") {
        debugger;
        window.infiniteState.complete();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  height: fit-content;
  .main__dogs {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

    .imagesRow {
      position: relative;
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
      .favIcon {
        display: none;
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 30px;
        height: 30px;
        &.shown {
          display: unset;
        }
      }
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
