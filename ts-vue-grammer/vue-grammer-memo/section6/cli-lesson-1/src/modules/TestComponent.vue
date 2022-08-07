<template>
  <div class="">TestComponentの本文です。{{ testData }}</div>
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
<style></style>
