import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
    // 第2引数はオブジェクト
    addCount(state, payload) {
      state.count += payload.value;
    },
  },
  actions: {
    // contextからcommit,state,dispatch...等,vuexが使える
    // incrementAction(context) {
    //   context.commit("increment");
    // },
    incrementAction({ commit }) {
      commit("increment");
    },
    addCountAction({ commit }, payload) {
      commit("addCount", payload);
    },
  },
  modules: {},
});
