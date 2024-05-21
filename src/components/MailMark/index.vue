<template>
  <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect" placement="top-start" teleport=".app-main">
    <template #reference>
      <TextButton :disabled="!selectedMail.length" >标记</TextButton>
    </template>
    <template #action="{ action}">
      <span>{{ action.text + `（${selectedMail.length}）` }}</span>
    </template>
  </van-popover>
</template>

<script setup lang="ts">
import { defineProps, type PropType, ref } from "vue";
import TextButton from "@/components/TextButton/index.vue";
import type { Mail } from "@/types.ts";

defineProps({
  selectedMail: {
    type: Array as PropType<Mail[]>,
    required: true
  }
})

const showPopover = ref(false);

// 通过 actions 属性来定义菜单选项
const actions = [
  { text: '标记为垃圾邮件' },
  { text: '标记为未读' }
];

function onSelect(val: any) {
  console.log(val);
}

</script>

<style scoped>

</style>
