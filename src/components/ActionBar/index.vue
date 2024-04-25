<template>
  <van-action-bar placeholder>
    <div class="action-bar" style="padding: 0 16px">
      <div class="action-bar__left">
        <slot name="left"></slot>
      </div>
      <div class="action-bar__center">
        <slot name="center"></slot>
      </div>
      <div class="action-bar__right">
        <slot name="right"></slot>
      </div>
    </div>
  </van-action-bar>
</template>

<script setup lang="ts">

</script>

<style>
.van-action-bar, .van-safe-area-bottom {
  margin: 0 auto;
  max-width: 540px;
  backdrop-filter: blur(2px);
  border-top: 1px solid var(--van-divider-border-color);;
  width: 100%;
}

.action-bar__right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  backdrop-filter: blur(2px);
  background-color: #ffffff;
}
</style>
