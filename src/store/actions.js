import axiosClient from "../api/axiosClient";

export async function fetchGenresMovie({ commit }) {
  try {
    const { data } = await axiosClient.get("genre/movie/list");
    const res = data.genres;
    if (res) {
      commit("setGenresMovie", res);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchGenresTv({ commit }) {
  try {
    const { data } = await axiosClient.get("genre/tv/list");
    const res = data.genres;
    if (res) {
      commit("setGenresTv", res);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function searchMulti({ commit }, keyword) {
  try {
    const { data } = await axiosClient.get(`search/multi?query=${keyword}`);
    const res = data.results;
    commit("setMultiSearch", res);
  } catch (error) {
    console.log(error);
  }
}
