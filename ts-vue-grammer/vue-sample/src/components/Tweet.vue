<script setup lang="ts">
import { ref } from "vue";
import TweetPostFormVue from "./TweetPostForm.vue";
import TweetListVue from "./TweetList.vue";

const tweets = ref([
  {
    id: 0,
    description: "Hello, Mike,",
  },
  {
    id: 1,
    description: "Hello, Ken,",
  },
]);

const postTweet = (description: string) => {
  const tweet = { id: Math.random(), description };
  tweets.value.push(tweet);
};

const deleteTweet = (id: number) => {
  tweets.value = tweets.value.filter((t) => t.id !== id);
};
</script>

<template>
  <div class="container">
    <h1>Tweeter</h1>
    <TweetPostFormVue @post-tweet="postTweet" />
    <div class="tweet-container">
      <p v-if="tweets.length <= 0">No tweets have been added</p>
      <ul v-else>
        <TweetListVue :tweets="tweets" :delete-tweet="deleteTweet" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.delete-button {
  color: #fff;
  font-weight: bold;
  background-color: #c99a68;
  border-radius: 2px;
  border: none;
  width: 60px;
  height: 22px;
}

.delete-button:hover {
  background-color: #9d6324;
}

input {
  margin-bottom: 16px;
}
</style>
