<script setup lang="ts">
import { ref } from "vue";

const isDialogOpen = ref<boolean>(false);
const onClickButton = () => {
  isDialogOpen.value = !isDialogOpen.value;
};
</script>

<template>
  <div class="container">
    <button class="changeButton" @click="onClickButton">ダイアログ制御</button>
    <h1>Tab2コンテンツ</h1>
    <teleport to="body">
      <dialog class="dialog" :open="isDialogOpen">
        <span>Tab2コンテンツをダイアログで隠します</span>
      </dialog>
    </teleport>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.changeButton {
  margin: 15px;
}

.dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 65%;
  width: 60%;
  margin: auto;
  background-color: aliceblue;
}
</style>
