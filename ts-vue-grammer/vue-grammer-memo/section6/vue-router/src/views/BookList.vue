<template>
  <div>
    <h1>本の一覧</h1>
    <ul>
      <li @click="showBookDetail(book.id)" v-for="book in books" :key="book.id">
        {{ book.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BookList",
  data() {
    return {
      bookIndex: -1,
      books: [
        { id: 1, author: "夏目漱石", title: "我輩は猫である" },
        { id: 2, author: "坂口安吾", title: "堕落論" },
        { id: 3, author: "太宰治", title: "人間失格" },
      ],
    };
  },
  methods: {
    showBookDetail(id) {
      this.bookIndex = id - 1;
      console.log(this.bookIndex);
      this.$router.push({
        name: "Book",
        params: {
          id: this.books[this.bookIndex].id,
          author: this.books[this.bookIndex].author,
          title: this.books[this.bookIndex].title,
        },
      });
    },
  },
};
</script>

<style></style>
