<script setup lang="ts">
import PersonPostFormVue from './PersonPostForm.vue';
import PersonListVue from './PersonList.vue';
</script>

<template>
    <div class="container">
        <h1>Title</h1>
        <PersonPostFormVue />
        <div class="list-container">
            <ul>
                <PersonListVue />
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

</style>