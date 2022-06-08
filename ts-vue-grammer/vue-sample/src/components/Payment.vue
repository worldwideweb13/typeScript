<script setup lang="ts">
import { ref } from "vue";

const itemName1 = ref<string>("Desk");
const itemName2 = "Bike";
const price1 = 400;
const price2 = 380000;
const url1 = "https://00m.in/MfVce";

const buy = (itemName: string) => {
  alert("Are you sure to buy " + itemName + "?");
};


const input = (event: any) => {
  console.log("event", event.target.value);
  // objectそのものが定数(const)であっても中のプロパティに関しては変更可能
  itemName1.value = event.target.value;
};
</script>

<template>
  <div class="container">
    <h1>最近の支出</h1>
    <input v-on:input="input" />
    <div class="payment">
      <label>{{ itemName1 }}</label>
      <label>${{ price1 }}</label>
      <a v-bind:href="url1">bought at...</a>
      <button v-on:click="buy(itemName1)">buy</button>
    </div>
    <div class="payment">
      <label>{{ itemName2 }}</label>
      <label>${{ price2 }}</label>
      <button v-on:click="buy(itemName2)">buy</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.payment {
  display: flex;
  justify-content: space-between;
  width: 400px;
  height: 80px;
  background-color: #f0f8ff;
  align-items: center;
  margin-bottom: 8px;
}

label {
  font-size: 20px;
  font-weight: bold;
}
</style>
