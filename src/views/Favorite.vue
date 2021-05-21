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
      activeState: (state) => state.activeState,
    }),
  },
  mounted() {
    let that = this;
    this.dogs = [];
    if (localStorage.dogs) {
      that.dogs = JSON.parse(localStorage.dogs).filter((el) => {
        return el.isFavourite === true;
      });
    }
    console.log(this.dogs);
  },

  methods: {
    ...mapActions("dogs", [
      "getAllBreeds",
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
      let localStorageFavDocs = this.dogs.filter((el) => el.isFavourite);
      dog.isFavourite = !dog.isFavourite;
      localStorage.dogs = JSON.stringify(this.dogs);
      localStorage.dogs = JSON.stringify([...localStorageFavDocs]);
      this.dogs = this.dogs.filter((el) => {
        return el.isFavourite === true;
      });
    },
    showFavourite(dog) {
      dog.isFavouriteShown = true;
    },
    hideFavourite(dog) {
      dog.isFavouriteShown = false;
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
