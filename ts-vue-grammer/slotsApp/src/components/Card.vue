<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{ title: string }>();
</script>

<template>
  <div class="card-container">
    <span class="title">{{ title }}</span>
    <slot></slot>
  </div>
</template>

<style scoped>
.card-container {
  box-shadow: 2, 8px, black;
  border-radius: 8px;
  padding: 20px 20px;
  width: 300px;
  height: 80px;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: 600;
}
</style>
