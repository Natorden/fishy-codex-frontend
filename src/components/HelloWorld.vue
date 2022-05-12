<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Welcome to the Fishy Codex, if you already have an account,
      <router-link to="/login">login</router-link>. If you're new
      here, <router-link to="/register">register</router-link> an account
<!--      <a target="_blank" href="http://localhost:3000/login">login</a>-->
<!--      <a target="_blank" href="http://localhost:3000/register">register</a>-->
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
