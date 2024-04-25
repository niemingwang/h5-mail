<template>
  <van-popup position="bottom" v-model:show="show" round :lock-scroll="false"
             class="new-mail-sheet"
             @open="onOpen"
             @close="onClose" :before-close="handleBeforeClose">
    <div class="new-mail-sheet__header">
      <TextButton @click="handleBeforeClose() ? show = false : ''">
        <van-icon name="cross" :size="22" color="#1d1d1f" />
      </TextButton>
      <van-text-ellipsis v-show="showTitle" :content="subject"
                         style="max-width: 50%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap" />
      <van-icon v-show="showTitle" :name="canSend ? Icons.arrowUpActive: Icons.arrowUp" :size="26" />
    </div>
    <van-divider v-show="showTitle" style="margin: 0" />

    <div class="mail-title" ref="titleRef">
      <div class="action-title">
        <van-text-ellipsis style="flex: 1" :content="subject" />
        <van-icon :name="canSend ? Icons.arrowUpActive: Icons.arrowUp" :size="36" />
      </div>
    </div>

    <van-form :label-width="50">
      <van-field ref="receiverRef" type="textarea" name="收件人" label="收件人" colon v-model="mailFormModel.receiver"
                 rows="1" autosize></van-field>
      <van-field type="textarea" name="发件人" label="发件人" colon v-model="mailFormModel.from" rows="1"
                 autosize></van-field>
      <van-field type="textarea" name="主题" label="主题" colon v-model="mailFormModel.subject" rows="1"
                 autosize></van-field>
      <van-field type="textarea" name="内容" v-model="mailFormModel.content" :rows="10" autosize></van-field>
    </van-form>
  </van-popup>

  <van-dialog v-model:show="showWarning" :showConfirmButton="false">
    <van-space direction="vertical" fill :size="20" align="center" style="padding: 16px" class="sb-van-space">
      <van-space direction="vertical" fill :size="20" align="center">
        <van-icon :name="Icons.mail" :size="40" />
        <h3 style="margin: 0">将此邮件存储为草稿么</h3>
        <van-space direction="vertical" fill align="center" style="font-size: 14px;color: rgba(0, 0, 0, .56);">
          <span>此邮件尚未发送，且含有未存储的更改内容。</span>
          <span>你可以先将其存储为草稿，稍后再处理。</span>
        </van-space>
      </van-space>
      <van-button block @click="onWarnSelect('cancel')">取消</van-button>
      <van-button block @click="onWarnSelect('unsaved')">不存储</van-button>
      <van-button type="primary" block @click="onWarnSelect('save')">存储</van-button>
    </van-space>
  </van-dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useSystemStore } from "@/store/system.ts";
import Icons from "@/assets/icons/svgs";
import { useElementBounding } from "@vueuse/core";
import TextButton from '@/components/TextButton/index.vue'

const systemStore = useSystemStore()
const show = computed({
  get() {
    return systemStore.newMail
  },
  set(val: boolean) {
    systemStore.changeNewMailState(val)
  }
})

const titleRef = ref(null)
const showTitle = ref(false)
onMounted(() => {
  watch(titleRef, (v) => {
    if (v) {
      const {top} = useElementBounding(titleRef.value)
      watch(top, (value) => {
        showTitle.value = value < 80
      })
    }
  })
})

const mailFormModel = reactive({
  from: '',
  receiver: '',
  subject: '',
  content: '\n\n发自我的iPhone',
})

const subject = computed(() => {
  return mailFormModel.subject || '新邮件'
})

const canSend = computed(() => {
  return mailFormModel.from && mailFormModel.receiver && mailFormModel.subject && mailFormModel.content
})

function onOpen() {
  document.documentElement.style.overflow = 'hidden'
}

function onClose() {
  document.documentElement.style.overflow = 'auto'
}

const showWarning = ref(false)

function handleBeforeClose() {
  if (mailFormModel.from || mailFormModel.receiver || mailFormModel.subject) {
    showWarning.value = true
    return false
  } else {
    return true
  }
}

function onWarnSelect(val: string) {
  console.log(val);
  showWarning.value = false
}
</script>

<style>
.new-mail-sheet {
  height: 90% !important;
  overflow: auto;
}

.new-mail-sheet__header {
  overflow: hidden;
  width: 100%;
  padding: 6px 10px;
  z-index: 20;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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

.sb-van-space > div[class="van-space-item"]:not(:first-child) {
  width: 100%;
}
</style>
