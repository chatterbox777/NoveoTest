import * as axios from "axios";
import {
  GET_ALL_BREEDS,
  GET_DOGS_IMAGES_BY_BREED,
  SET_LOADING,
} from "./modules/types";
export default {
  namespaced: true,
  actions: {
    async getAllBreeds({ commit }) {
      try {
        const response = await axios.get("https://dog.ceo/api/breeds/list/all");
        console.log(response);
        commit({ type: GET_ALL_BREEDS, breeds: response.data.message });
      } catch (error) {
        console.error(error);
      }
    },
    async getDogsImagesByBreed({ commit }, { breedName }) {
      try {
        commit({
          type: SET_LOADING,
          payload: { loadType: "dogsImages", value: true },
        });
        const response = await axios.get(
          `https://dog.ceo/api/breed/${breedName}/images`
        );
        console.log(response);
        commit({
          type: GET_DOGS_IMAGES_BY_BREED,
          dogsImages: response.data.message,
        });
        commit({
          type: SET_LOADING,
          payload: { loadType: "dogsImages", value: false },
        });
      } catch (error) {
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
      debugger;
      state.isLoading[payload.loadType] = payload.value;
      console.log(state.isLoading);
    },
    GET_ALL_BREEDS(state, { breeds }) {
      state.breeds = breeds;
    },
    GET_DOGS_IMAGES_BY_BREED(state, { dogsImages }) {
      state.dogsImages = dogsImages;
    },
  },
  state: {
    breeds: null,
    dogsImages: [],
    isLoading: {
      dogsImages: false,
      breeds: false,
    },
  },
  getters: {},
};
