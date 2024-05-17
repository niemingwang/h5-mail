<template>
  <van-nav-bar :border="border" :fixed="false">
    <template #left>
      <TextButton at-l v-if="isEdit" @click="onSelectedAllChange">{{
          isSelectedAll ? '取消全选' : '全选'
        }}
      </TextButton>
      <TextButton at-l show-icon v-else @click="router.push('/')">
        <van-icon name="arrow-left" :size="22" />
        邮箱
      </TextButton>
    </template>
    <template #title>
      {{ showTitle ? selectedCount && isEdit ? `已选 ${selectedCount} 封` : actions[activeIndex].text : '' }}
    </template>
    <template #right>
      <van-space fill :size="5">
        <TextButton @click="onEdit">{{ isEdit ? '取消' : '编辑' }}</TextButton>
        <TextButton v-show="!isEdit" @click="createNewMail">
          <van-icon :name="Icons.filterFill" :size="22" />
        </TextButton>
        <TextButton v-show="!isEdit" @click="createNewMail" at-r>
          <van-icon :name="Icons.edit" :size="22" />
        </TextButton>
      </van-space>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import type { PopoverAction } from 'vant';
import Icons from '@/assets/icons/svgs'
import { useSystemStore } from "@/store/system.ts";
import { useRouter } from "vue-router";
import TextButton from '@/components/TextButton/index.vue'

const emits = defineEmits(['select-all'])
const systemStore = useSystemStore()
const router = useRouter()

const props = defineProps({
  isSelectedAll: {
    type: Boolean,
    default: false
  },
  selectedCount: {
    type: Number,
    default: 0
  },
  showTitle: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
})

const actions: PopoverAction[] = [
  {text: '收件箱', icon: Icons.inbox, path: '/inbox'},
  {text: '星标邮件', icon: Icons.star, path: '/inbox'},
  {text: '草稿箱', icon: Icons.file, path: '/inbox'},
  {text: '已发送', icon: Icons.send, path: '/inbox'},
  {text: '废纸篓', icon: Icons.trash, path: '/inbox'},
];

const activeIndex = computed(() => {
  return actions.findIndex((item) => item.text === systemStore.mailKind)
})

const isEdit = computed(() => {
  return systemStore.isEdit
})

function onEdit() {
  systemStore.changeEdit()
}

function onSelectedAllChange() {
  emits('select-all', !props.isSelectedAll)
}

function createNewMail() {
  systemStore.changeNewMailState(true)
}
</script>

<style>
.van-nav-bar--fixed {
  max-width: 540px;
  max-height: 46px;
  margin: 0 auto;
  top: var(--top-bar-height) !important;
  right: 0;
}
</style>
