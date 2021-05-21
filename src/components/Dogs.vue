<template>
  <div class="main">
    <div v-if="dogs.length > 0" class="main__dogs">
      <div v-for="dog in dogs" :key="dog.id" class="imagesRow">
        <img
          :src="dog.imgSrc"
          alt="dog picture"
          @mouseover="showFavorite(dog)"
          @mouseout="hideFavorite(dog)"
          @click="toggleFavorite(dog)"
        />
        <img
          :src="getFavoriteImage(dog)"
          alt="favorite"
          class="favIcon"
          :class="{ shown: dog.isFavoriteShown, favActive: dog.isFavorite }"
        />
      </div>
    </div>
    <div v-if="dogs.length === 0" class="empty">
      ...Ooooppssss, no dogs to show
    </div>
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
    let localStorageFavDocs = this.dogs.filter((el) => el.isFavorite);
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
    this.clearDogsImagesData();
    this.dogs = [];
    this.setSelectedBreed({ breedName: "" });
  },
  watch: {
    dogsImages() {
      let that = this;
      let copyArr = [...this.dogsImages].map((el) => {
        return {
          imgSrc: el,
          isFavorite: false,
          isFavoriteShown: false,
          breed: that.selectedBreed,
          id: uuidv4(),
        };
      });

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
    getFavoriteImage(dog) {
      switch (dog.isFavorite) {
        case true:
          return this.favFullfield;
        case false:
          return this.favEmpty;
        default:
          break;
      }
    },
    toggleFavorite(dog) {
      dog.isFavorite = !dog.isFavorite;
    },
    showFavorite(dog) {
      dog.isFavoriteShown = true;
    },
    hideFavorite(dog) {
      dog.isFavoriteShown = false;
    },
    async infiniteHandler() {
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

<style scoped lang="scss">
.empty {
  position: absolute;
  left: 40%;
  top: 50%;
  font-size: 24px;
}
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
          pointer-events: none;
        }
      }
    }
  }
}
</style>
