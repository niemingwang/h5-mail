<template>
  <section>
    <van-sticky :offset-top="44">
      <van-nav-bar :border="false">
        <template #right>
          <van-space fill :size="5">
            <TextButton>
              <van-icon name="replay" :size="22" />
            </TextButton>
            <TextButton @click="createNewMail" at-r>
              <van-icon :name="Icons.edit" :size="22" />
            </TextButton>
          </van-space>
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="mail-title" ref="titleRef">
      <div class="action-title">
        <span>邮箱</span>
      </div>
    </div>

    <Navigator :actions="actions"></Navigator>
  </section>
</template>

<script setup lang="ts">
import Icons from "@/assets/icons/svgs";
import TextButton from "@/components/TextButton/index.vue";
import type { PopoverAction } from "vant";
import Navigator from '@/components/Navigator/index.vue'
import { useSystemStore } from "@/store/system.ts";

const systemStore = useSystemStore()

const actions: PopoverAction[] = [
  {text: '收件箱', icon: Icons.inbox},
  {text: '草稿箱', icon: Icons.file},
  {text: '已发送', icon: Icons.send},
  {text: '已删除', icon: Icons.trash},
];

function createNewMail() {
  systemStore.changeNewMailState(true)
}
</script>

<style scoped>
.mail-title {
  width: 100%;
  background-color: #ffffff;
  padding: 6px 16px;
  font-size: 21px;
  font-weight: bold;
}

.action-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
