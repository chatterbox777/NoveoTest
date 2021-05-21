<template>
  <div class="main">
    <div v-if="dogs.length > 0" class="main__dogs">
      <div v-for="dog in dogs" :key="dog.id" class="imagesRow">
        <img
          :src="dog.imgSrc"
          alt="dog picture"
          @mouseover="showFavourite(dog)"
          @mouseout="hideFavourite(dog)"
          @click="toggleFavourite(dog)"
        />
        <img
          :src="getFavouriteImage(dog)"
          alt="favourite"
          class="favIcon"
          :class="{ shown: dog.isFavouriteShown, favActive: dog.isFavourite }"
        />
      </div>
    </div>
    <div v-if="dogs.length === 0">...Empty</div>
    <div v-if="dogs.length" v-observe-visibility="infiniteHandler"></div>
    <VLoader v-if="activeState === 'loading'" />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
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

  computed: {
    ...mapState("dogs", {
      dogsImages: (state) => state.dogsImages,
      isLoading: (state) => state.isLoading.dogsImages,
      selectedBreed: (state) => state.selectedBreed,
      activeState: (state) => state.activeState,
    }),
  },
  mounted() {
    this.dogs = [];
  },

  beforeDestroy() {
    let localStorageFavDocs = this.dogs.filter((el) => el.isFavourite);
    if (localStorage.dogs) {
      localStorage.dogs = JSON.stringify([
        ...localStorageFavDocs,
        ...JSON.parse(localStorage.dogs),
      ]);
    } else {
      localStorage.dogs = JSON.stringify(localStorageFavDocs);
    }
  },
  destroyed() {
    debugger;
    this.clearDogsImagesData();
    this.dogs = [];
    this.setSelectedBreed({ breedName: "" });
  },
  watch: {
    dogsImages() {
      debugger;
      let that = this;
      let copyArr = [...this.dogsImages].map((el) => {
        return {
          imgSrc: el,
          isFavourite: false,
          isFavouriteShown: false,
          breed: that.selectedBreed,
          id: uuidv4(),
        };
      });
      console.log(copyArr);

      if (localStorage.dogs) {
        let endArr = [...copyArr];
        that.dogs = [...that.dogs, ...new Set(endArr)];
      } else {
        that.dogs = [...that.dogs, ...new Set(copyArr)];
      }
    },
    selectedBreed() {
      this.dogs = [];
    },
  },
  methods: {
    ...mapActions("dogs", [
      "getDogsImagesByBreed",
      "clearDogsImagesData",
      "setSelectedBreed",
    ]),
    getFavouriteImage(dog) {
      switch (dog.isFavourite) {
        case true:
          return this.favFullfield;
        case false:
          return this.favEmpty;
        default:
          break;
      }
    },
    toggleFavourite(dog) {
      dog.isFavourite = !dog.isFavourite;
    },
    showFavourite(dog) {
      dog.isFavouriteShown = true;
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
  margin-top: 100px;
  .main__dogs {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px;

    .imagesRow {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 200px;
      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border: 1px solid grey;
        box-shadow: 0px 0px 5px 2px grey;

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
        &.favActive {
          display: unset;
        }
      }
    }
  }
}
</style>
