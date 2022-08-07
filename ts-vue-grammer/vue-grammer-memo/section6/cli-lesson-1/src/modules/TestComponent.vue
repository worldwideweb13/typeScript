<template>
  <div class="red-box">TestComponentの本文です。{{ testData }}</div>
</template>

<script>
export default {
  name: "TestComponent",
  data() {
    return {
      testData: "このテキストは,testData: の中身です。",
    };
  },
};
</script>
<style scoped>
.red-box {
  border: 1px red solid;
}
</style>
