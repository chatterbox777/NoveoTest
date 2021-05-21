<template>
  <div class="main">
    <div class="main__dogs">
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
  },
  mounted() {
    let that = this;
    this.dogs = [];

    if (localStorage.dogs) {
      let filteredLocalStorageDogsByBreed = [
        ...JSON.parse(localStorage.dogs),
      ].filter((el) => {
        el.breed === that.selectedBreed;
      });

      that.dogs = filteredLocalStorageDogsByBreed;
    }
    console.log(this.dogs);
  },
  updated() {
    // debugger;
    // if (localStorage.dogs) {
    //   this.dogs = localStorage.dogs.map((el) => JSON.parse(el));
    // }
    // console.log(this.dogs);
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
        // let regexp = /breeds\/(\w+)\//;
        // let breed = el.match(regexp);

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
      dog.isFavourite = !dog.isFavourite;
      let that = this;
      if (localStorage.dogs) {
        localStorage.dogs = JSON.stringify([
          ...that.dogs,
          ...JSON.parse(localStorage.dogs),
        ]);
      } else {
        localStorage.dogs = JSON.stringify(this.dogs);
      }
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
        &.favActive {
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
