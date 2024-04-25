<template>
  <section>
    <van-nav-bar
        :left-text="systemStore.mailKind"
        @click-left="onClickLeft"
        left-arrow
    >
      <template #right>
      </template>
    </van-nav-bar>

    <van-action-bar placeholder></van-action-bar>
  </section>
</template>

<script setup lang="ts">
import { useSystemStore } from "@/store/system.ts";
import { useRouter } from "vue-router";

const router = useRouter()
const systemStore = useSystemStore()

function onClickLeft() {
  router.back()
}
</script>

<style scoped>

</style>
