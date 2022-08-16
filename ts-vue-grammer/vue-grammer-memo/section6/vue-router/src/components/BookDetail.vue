<template>
  <div>
    <p>本の詳細</p>
    <p>著者: {{ books[bookIndex].author }}</p>
    <p>タイトル: {{ books[bookIndex].title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    author: String,
    title: String,
  },
  data() {
    return {
      bookIndex: this.$route.params.id - 1,
      books: [
        { id: 1, author: "夏目漱石", title: "我輩は猫である" },
        { id: 2, author: "坂口安吾", title: "堕落論" },
        { id: 3, author: "太宰治", title: "人間失格" },
      ],
    };
  },
  created() {
    if (this.$route.params.id > this.books.length) {
      this.$router.push("/book");
    }
  },
};
</script>

<style></style>
