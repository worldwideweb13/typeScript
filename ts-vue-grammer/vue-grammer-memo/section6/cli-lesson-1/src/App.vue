<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <TestComponent />
    <HelloWorld msg="HellowWorldのPropsの値を編集済み" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TestComponent from "./modules/TestComponent.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    TestComponent,
  },
};
</script>

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
