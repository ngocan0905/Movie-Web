import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTk3OWY5ODExYjUzYjIyYzFkYTM2ZTJiZTU5NTM4ZiIsInN1YiI6IjYyNWQ3ZjQ1ZjEwYTFhMzFjMWYxYmY2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g8kk2cNWOpTEE9OmKb6Vdvf9BV6mnVm942wHVO-AJ7w";
const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    common: {
      Authorization: `Bearer ${API_KEY}`,
    },
  },
});

export default axiosClient;
