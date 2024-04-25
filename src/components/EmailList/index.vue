<template>
  <van-swipe-cell v-for="mail in mails" :key="mail.id" stop-propagation :disabled="isEdit" @open="onOpen"
                  @close="onClose">
    <template #left>
      <van-button square type="primary" text="已读" style="width: 70px;">
        <van-space direction="vertical" :size="2">
          <van-badge :dot="mail.status !== 'unread'" color="#ffffff" :offset="[-2,5]">
            <van-icon v-if="mail.status !== 'unread'" :name="Icons.mailFill" :size="22" />
            <van-icon v-else :name="Icons.mailOpenedFill" :size="22" />
          </van-badge>
          <span>{{ mail.status !== 'unread' ? '未读' : '已读' }}</span>
        </van-space>
      </van-button>
    </template>
    <EmailCell @click="omMailClick(mail)" :email="mail" :is-edit="isEdit" :checked="isChecked(mail.id)" />
    <template #right>
      <van-button square type="warning" text="旗标" style="width: 70px;">
        <van-space direction="vertical" :size="2">
          <van-icon :name="Icons.flag" :size="22" />
          <span>旗标</span>
        </van-space>
      </van-button>
      <van-button square type="danger" text="删除" style="width: 70px;">
        <van-space direction="vertical" :size="2">
          <van-icon name="delete" :size="22" />
          <span>删除</span>
        </van-space>
      </van-button>
    </template>
    <van-divider style="margin: 0; padding: 0 16px" />
  </van-swipe-cell>
</template>

<script setup lang="ts">
import { PropType, defineProps, computed, defineEmits, ref } from 'vue'
import EmailCell from '@/components/EmailCell/index.vue'
import Icons from '@/assets/icons/svgs/index.ts'
import { useSystemStore } from "@/store/system.ts";

type Email = {
  id: string,
  subject: string,
  body: string,
  from: string,
  date: string,
  status: string
}

const systemStore = useSystemStore()
const emits = defineEmits(['checked-change', 'mail-click'])

const props = defineProps({
  mails: {
    type: Array as PropType<Email[]>,
    required: true
  },
  selectedIds: {
    type: Array,
    default: []
  },
})

const isEdit = computed(() => {
  return systemStore.isEdit
})

function isChecked(id: string) {
  return props.selectedIds.includes(id)
}

function omMailClick(mail: Email) {
  if (opened.value) return
  isEdit.value ? emits('checked-change', mail) : emits('mail-click', mail)
}

const opened = ref(false)

function onOpen() {
  opened.value = true
}

function onClose() {
  opened.value = false
}

</script>

<style scoped>

</style>
