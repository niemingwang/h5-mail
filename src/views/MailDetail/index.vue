<template>
  <section>
    <van-nav-bar border>
      <template #left>
        <TextButton at-l show-icon @click="router.back()">
          <van-icon name="arrow-left" :size="22" />
          {{ systemStore.mailKind }}
        </TextButton>
      </template>
    </van-nav-bar>
    <div>123</div>
    <div>123</div>
    <div>123</div>
    <div>123</div>
    <div>123</div>
    <div>123</div>
    <div>123</div>
    <van-action-bar placeholder></van-action-bar>
  </section>
</template>

<script setup lang="ts">
import { useSystemStore } from "@/store/system.ts";
import { useRouter } from "vue-router";
import TextButton from "@/components/TextButton/index.vue";

const router = useRouter()
const systemStore = useSystemStore()

// function onClickLeft() {
//   router.back()
// }
</script>

<style scoped>

</style>
