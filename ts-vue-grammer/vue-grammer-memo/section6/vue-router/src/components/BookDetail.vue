<template>
  <div>
    <p>本の詳細</p>
    <p>著者: {{ author }}</p>
    <p>タイトル: {{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    author: String,
    title: String,
  },
};
</script>

<style></style>
