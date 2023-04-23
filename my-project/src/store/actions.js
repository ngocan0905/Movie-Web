import axiosClient from "../api/axiosClient";

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
export async function fetchTvAiringToday({ commit }) {
  try {
    const { data } = await axiosClient.get("tv/airing_today");
    const res = data.results;
    if (res) {
      commit("setTvAiringToday", res);
    }
  } catch (error) {
    console.log(error);
  }
}
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
