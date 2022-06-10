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

const registerPerson = (person: Person) => {
  persons.value.push(person);
};

const deletePerson = (id: number) => {
  persons.value = persons.value.filter((t) => t.id !== id );
};
</script>

<template>
  <div class="container">
    <h1>Title</h1>
    <PersonPostFormVue @register="registerPerson" />
    <div class="list-container">
      <ul>
        <PersonListVue :persons="persons" @delete-person="deletePerson" />
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
