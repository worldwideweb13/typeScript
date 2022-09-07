<template>
  <v-app>
    <Header />
    <v-main>
      <c-container>
        <router-view :books="books" @add-book-list="addBook" />
      </c-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/global/Header.vue";
import Footer from "@/global/Footer.vue";
const STORAGE_KEY = "books";

export default {
  name: "App",
  data() {
    return {
      books: [],
      newBook: null,
    };
  },
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },
  methods: {
    addBook(e) {
      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: "",
        memo: "",
      });
      // this.newBook = "";
      this.saveBooks();
      // 最後に追加したidの取得
      // console.log(this.books.slice(-1)[0].id);
      this.goToEditPage(this.books.slice(-1)[0].id);
    },
    removeBook(n) {
      this.books.splice(n, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`);
    },
  },
  components: { Header, Footer },
};
</script>
