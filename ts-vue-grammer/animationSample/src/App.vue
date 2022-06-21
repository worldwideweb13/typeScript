<template>
  <div class="container">
    <div class="circle"></div>
    <button @click="animateCircle" :class="{ animate: animateCircle }">
      Animate
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const animatingCircle = ref(false);
const animateCircle = () => {
  animatingCircle.value = true;
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #180081;
  border-radius: 30px;
  background-color: #000981;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #0b64a8;
  border-color: #0b64a8;
}
.circle {
  width: 8rem;
  height: 8rem;
  background-color: #2c5b8e;
  margin-bottom: 2rem;
  border-radius: 4rem;
  /* transition: transform 0.3s ease-out; */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}

.animate {
  /* transform: translateX(100px); */
  animation: fade 0.3s ease-out forwards;
}

/* fade...cssでfadeを指定した時の動きをつける */
@keyframes fade {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100px);
  }
}
</style>
