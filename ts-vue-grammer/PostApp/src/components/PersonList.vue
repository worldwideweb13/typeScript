<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Person } from "./Persons.vue";

type Props = {
  persons: Person[];
};

defineProps<Props>();

const emit = defineEmits(["delete-person"]);

const deletePerson = (id: number, name: string) => {
  if (confirm(name + "さんを削除しますか？")) {
    emit("delete-person", id);
  }
};
</script>

<template>
  <li v-for="person in persons" :key="person.id" class="person-list">
    <span>{{ person.name }}</span>
    <span>age: {{ person.age }}</span>
    <button>
      <span @click="deletePerson(person.id, person.name)"> delete</span>
    </button>
  </li>
</template>

<style scoped>
.person-list {
  list-style: none;
  margin-bottom: 12px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  background-color: rgb(228, 201, 133);
  padding: 8px 20px;
  width: 300px;
}
</style>
