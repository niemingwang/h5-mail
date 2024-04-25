<template>
  <nav>
    <ul class="mail-nav-list">
      <li class="mail-nav-list-item" v-touched="['#f2f3f5','#ffffff']" v-for="item in actions" :key="item.text"
          @click="onMailKindClick(item)">
        <van-space align="center">
          <van-icon :name="item.icon" :size="24" />
          {{ item.text }}
        </van-space>
        <van-space align="center">
          <span style="color:#6e6e73;">6</span>
          <van-icon name="arrow" :size="18" color="#b2b2b2" />
        </van-space>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { PopoverAction } from "vant";
import { defineProps, PropType } from "vue";
import { useRouter } from "vue-router";
import { useSystemStore } from "@/store/system.ts";

const router = useRouter();
const systemStore = useSystemStore()

defineProps({
  actions: {
    type: Array as PropType<PopoverAction[]>,
    required: true
  }
})

function onMailKindClick(item: PopoverAction) {
  router.push({name: 'mails', query: {kind: item.text}}).then(() => {
    systemStore.changeMailKind(item.text)
  })
}

</script>

<style scoped>
.mail-nav-list {
  padding-left: 10px;
  padding-right: 10px;
  margin: 10px 0;
}

.mail-nav-list-item {
  margin: 2px 0;
  min-height: 46px;
  padding: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  font-size: 17px;

  &:hover {
    background-color: #f5f5f7;
  }
}
</style>
