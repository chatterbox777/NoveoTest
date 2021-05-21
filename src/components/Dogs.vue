<template>
  <div class="main">
    <div class="main__dogs">
      <div v-for="dog in dogs" :key="dog.imgSrc" class="imagesRow">
        <img
          :src="dog.imgSrc"
          alt="dog picture"
          @mouseover="showFavourite(dog)"
          @mouseout="hideFavourite(dog)"
        />
        <img
          :src="getFavouriteImage"
          alt="favourite"
          class="favIcon"
          :class="{ shown: dog.isFavouriteShown, favActive: dog.isFavourite }"
        />
      </div>
    </div>
    <div v-if="dogsImages.length" v-observe-visibility="infiniteHandler"></div>
    <VLoader v-if="activeState === 'loading'" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import favEmpty from "../assets/favEmpty.svg";
import favFullfield from "../assets/favFullfield.svg";

import VLoader from "./shared/VLoader.vue";
export default {
  components: { VLoader },
  name: "Dogs",
  data() {
    return {
      favEmpty,
      favFullfield,
      dogs: [],
    };
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
  destroyed() {
    this.clearDogsImagesData();
    this.setSelectedBreed({ breedName: "" });
  },
  watch: {
    dogsImages() {
      let copyArr = [...this.dogsImages];
      this.dogs = copyArr.map((el) => {
        return { imgSrc: el, isFavourite: false, isFavouriteShown: false };
      });
    },
  },
  methods: {
    ...mapActions("dogs", [
      "getAllBreeds",
      "getDogsImagesByBreed",
      "clearDogsImagesData",
      "setSelectedBreed",
    ]),
    showFavourite(dog) {
      dog.isFavouriteShown = true;
      console.log(this.filteredDogsImages);
    },
    hideFavourite(dog) {
      dog.isFavouriteShown = false;
    },
    async infiniteHandler() {
      debugger;
      let that = this;

      if (
        that.activeState !== "noMoreDataAvailable" &&
        that.activeState !== "loading"
      ) {
        that.getDogsImagesByBreed({ breedName: that.selectedBreed });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  height: 1vh;
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
        &:hover {
          cursor: pointer;
        }
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
          pointer-events: none;
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
