<template>
  <header>
    <div class="top-bar">
      <div>邮箱</div>
      <van-icon :name="Icons.avatar" :size="26" @click="show = true" />
    </div>
  </header>

  <van-action-sheet v-model:show="show" title=" ">
    <template #default>
      <div class="user-info">
        <van-space direction="vertical" fill>
          <van-space direction="vertical" size="small">
            <span class="user-name">聂雨昊</span>
            <span class="user-account">2093304921@163.com</span>
          </van-space>
          <van-divider />
          <van-button plain hairline type="danger" icon="close" block>退出登录</van-button>
        </van-space>
      </div>
    </template>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icons from '@/assets/icons/svgs'

const show = ref(false)
</script>

<style scoped>
header {
  width: 100%;
  height: var(--top-bar-height);
}

.top-bar {
  max-width: 540px;
  margin: 0 auto;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--top-bar-height);
  background-color: #f5f5f7;
  color: #1c1c1e;
  font-weight: bold;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  padding: 30px 16px 16px;
  height: 60vh;
}

.user-name {
  font-size: 17px;
  font-weight: bold;
}

.user-account {
  font-size: 14px;
  color: var(--van-cell-label-color);
}
</style>
