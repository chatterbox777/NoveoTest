<template>
  <div class="main">
    <div v-if="dogs.length > 0" class="main__favorite">
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
      ...Ooops nothing to show, select breed and add some dogs to favorites
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import favEmpty from "../assets/favEmpty.svg";
import favFullfield from "../assets/favFullfield.svg";

export default {
  name: "Favorite",
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
    }),
  },
  mounted() {
    let that = this;
    this.dogs = [];
    if (localStorage.dogs) {
      that.dogs = JSON.parse(localStorage.dogs).filter((el) => {
        return el.isFavorite === true;
      });
    }
  },

  methods: {
    ...mapActions("dogs", [
      "getAllBreeds",
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
      let localStorageFavDocs = this.dogs.filter((el) => el.isFavorite);
      dog.isFavorite = !dog.isFavorite;
      localStorage.dogs = JSON.stringify(this.dogs);
      localStorage.dogs = JSON.stringify([...localStorageFavDocs]);
      this.dogs = this.dogs.filter((el) => {
        return el.isFavorite === true;
      });
    },
    showFavorite(dog) {
      dog.isFavoriteShown = true;
    },
    hideFavorite(dog) {
      dog.isFavoriteShown = false;
    },
  },
};
</script>


<style scoped lang="scss">
.empty {
  position: absolute;
  left: 30%;
  top: 50%;
  font-size: 24px;
}
.main {
  height: 1vh;
  margin-top: 100px;

  .main__favorite {
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
