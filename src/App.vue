<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <header>
    <img
      alt="Fishy Codex Logo"
      class="logo"
      src="@/assets/FishyCodex.png"
      width="192"
      height="192"
    />

    <div class="wrapper">
      <HelloWorld msg="Welcome to the Fishy Codex" />

    </div>
  </header>

  <RouterView />
</template>

<style>

</style>
