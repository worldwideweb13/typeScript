<template>
  <div class="red-box">
    <div class="border__blue">SCSSのクラスをこの文字列に適用します。</div>
    <div class="bakcground__primary">
      SCSSグローバルをこの文字列に適用します
    </div>
    <div>TestComponentの本文です。{{ testData }}</div>
  </div>
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
<style scoped lang="scss">
.red-box {
  border: 1px red solid;
}

.border {
  &__blue {
    border: 1px blue solid;
  }
}

.bakcground__primary{
    background-color: $color-primary;
}

</style>
