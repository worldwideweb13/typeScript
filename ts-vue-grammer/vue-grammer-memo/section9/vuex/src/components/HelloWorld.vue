<template>
  <div>
    <button @click="increment">+</button>
    <button @click="addCount">+10</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    addCount() {
      this.$store.commit("addCount", {
        value: 10,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
