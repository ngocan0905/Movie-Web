import { createStore } from "vuex";
import state from "./state";
import * as mutations from "../store/mutation";
import * as actions from "../store/actions";
const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
