<script setup lang="ts">
import { ref, Ref } from "vue";
import PersonPostFormVue from "./PersonPostForm.vue";
import PersonListVue from "./PersonList.vue";

export type Person = {
  id: number;
  name: string;
  age: number;
};

const persons: Ref<Person[]> = ref([
  {
    id: 0,
    name: "mike",
    age: 24,
  },
  {
    id: 1,
    name: "Youko",
    age: 32,
  },
]);
</script>

<template>
  <div class="container">
    <h1>Title</h1>
    <PersonPostFormVue />
    <div class="list-container">
      <ul>
        <PersonListVue :persons="persons" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
