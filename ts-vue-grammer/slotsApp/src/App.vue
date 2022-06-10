<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import CardList from "./components/CardList.vue";
import SecondCardList from "./components/SecondCardList.vue";

const isActiveTab = ref("1");
const updateTab = (isFirst: string) => {
  isActiveTab.value = isFirst;
};

const currentComponent = computed(() => {
  switch (isActiveTab.value) {
    case '1':
      return CardList;
    case '2':
      return SecondCardList;
  }
});
</script>

<template>
  <div class="tab-changer">
    <button @click="updateTab('1')">Tab 1</button>
    <button @click="updateTab('2')">Tab 2</button>
  </div>
  <div class="tab-contents">
    <component :is="currentComponent"></component>
    <!-- <CardList v-if="isFirstTab"></CardList>
    <SecondCardList v-if="!isFirstTab"></SecondCardList> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
