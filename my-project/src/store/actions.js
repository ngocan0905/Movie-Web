import axiosClient from "../api/axiosClient";
export async function fetchMoviePopular({ commit }) {
  try {
    const { data } = await axiosClient.get("movie/popular");
    const res = data.results.slice(0, 6);
    if (res) {
      commit("setMoviePopular", res);
    }
  } catch (error) {
    console.log(error);
  }
}
export async function fetchMovieNowPlaying({ commit }) {
  try {
    const { data } = await axiosClient.get("movie/now_playing");
    const res = data.results;
    if (res) {
      commit("setMovieNowPlaying", res);
    }
  } catch (error) {
    console.log(error);
  }
}
