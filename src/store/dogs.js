import * as axios from "axios";
import {
  GET_ALL_BREEDS,
  GET_DOGS_IMAGES_BY_BREED,
  SET_LOADING,
  SET_ACTIVE_STATE,
  SET_SELECTED_BREED,
  CLEAR_DOGS_IMAGES,
} from "./modules/types";
export default {
  namespaced: true,
  actions: {
    clearDogsImagesData({ commit }) {
      commit({ type: CLEAR_DOGS_IMAGES });
    },
    setSelectedBreed({ commit }, { breedName }) {
      commit({ type: SET_SELECTED_BREED, breedName });
    },
    setActiveState({ commit }, { payload }) {
      commit({ type: SET_ACTIVE_STATE, payload });
    },
    async getAllBreeds({ commit }) {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        commit({ type: GET_ALL_BREEDS, breeds: response.data.message });
      } catch (error) {
        console.error(error);
      }
    },
    async getDogsImagesByBreed({ commit, dispatch }, { breedName }) {
      // debugger;
      try {
        dispatch("setActiveState", { payload: "loading" });
        commit({
          type: SET_LOADING,
          payload: { loadType: "dogsImages", value: true },
        });
        const response = await axios.get(
          `https://dog.ceo/api/breed/${breedName}/images/random/10`
        );
        let receivedImages = response.data.message;
        console.log(receivedImages);
        commit({
          type: GET_DOGS_IMAGES_BY_BREED,
          dogsImages: receivedImages,
        });
        commit({
          type: SET_LOADING,
          payload: { loadType: "dogsImages", value: false },
        });
        if (receivedImages.length > 0) {
          dispatch("setActiveState", { payload: "imagesAreShown" });
        } else {
          dispatch("setActiveState", { payload: "noMoreDataAvailable" });
        }
      } catch (error) {
        dispatch("setActiveState", { payload: "retry" });
        commit({
          type: SET_LOADING,
          payload: { loadType: "dogsImages", value: false },
        });
        console.error(error);
      }
    },
  },
  mutations: {
    SET_LOADING(state, { payload }) {
      state.isLoading[payload.loadType] = payload.value;
      console.log(state.isLoading);
    },
    GET_ALL_BREEDS(state, { breeds }) {
      state.breeds = breeds;
    },
    GET_DOGS_IMAGES_BY_BREED(state, { dogsImages }) {
      debugger;
      state.dogsImages = [...state.dogsImages, ...dogsImages];
      console.log(`DOGS IMAGES: ${state.dogsImages}`);
    },
    SET_SELECTED_BREED(state, { breedName }) {
      state.selectedBreed = breedName;
    },
    SET_ACTIVE_STATE(state, { payload }) {
      console.log(`activeState = ${payload}`);
      state.activeState = payload;
    },
    CLEAR_DOGS_IMAGES(state) {
      state.dogsImages = [];
    },
  },
  state: {
    breeds: null,
    selectedBreed: "",
    dogsImages: [],
    isLoading: {
      dogsImages: false,
      breeds: false,
    },
    activeState: "empty",
  },
  getters: {},
};
