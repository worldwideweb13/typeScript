import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    users: [
      { id: 1, name: "大谷", isVisible: true },
      { id: 2, name: "ダルビッシュ", isVisible: true },
      { id: 3, name: "錦織", isVisible: false },
    ],
  },
  getters: {
    // visibleUsers( state ){
    //   return state.users.filter( user => user.isVisible )
    // }
    // アロー関数でgetter methodを書く場合
    visibleUsers: (state) => state.users.filter((user) => user.isVisible),
    getUserById: (state) => (id) => {
      return state.users.find((user) => user.id === id);
    },
  },
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
