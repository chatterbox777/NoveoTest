import * as axios from "axios";
import { GET_ALL_BREEDS } from "./modules/types";
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
  },
  mutations: {
    GET_ALL_BREEDS(state, { breeds }) {
      state.breeds = breeds;
    },
  },
  state: {
    breeds: null,
  },
  getters: {},
};
