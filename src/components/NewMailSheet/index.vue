<template>
  <van-popup position="bottom" v-model:show="show" round :lock-scroll="false"
             class="new-mail-sheet"
             @open="onOpen"
             @close="onClose" :before-close="handleBeforeClose">
    <div class="new-mail-sheet__header">
      <TextButton @click="handleBeforeClose() ? show = false : ''">
        <van-icon name="cross" :size="22" color="#1d1d1f" />
      </TextButton>
    </div>
    <van-divider v-show="showTitle" style="margin: 0" />

    <div class="mail-title" ref="titleRef">
      <div class="action-title">
        <van-text-ellipsis style="flex: 1" :content="subject" />
        <van-icon :name="canSend ? Icons.arrowUpActive: Icons.arrowUp" :size="40" />
      </div>
    </div>

    <van-space fill :size="5" direction="vertical" style="padding: 0 16px">
      <InputTagField label="收件人：" @change="onReceiverChange" >
        <template #suffix>
          <TextButton show-icon>
            <van-icon :name="Icons.addressBook" :size="26" />
          </TextButton>
        </template>
      </InputTagField>
      <van-divider style="margin: 0" />
      <InputTagField label="抄送：" @change="onReceiverChange" >
        <template #suffix>
          <TextButton show-icon>
            <van-icon :name="Icons.addressBook" :size="26" />
          </TextButton>
        </template>
      </InputTagField>
      <van-divider style="margin: 0" />
      <InputTagField label="发件人：" :tag="false" v-model="mailFormModel.from" />
      <van-divider style="margin: 0" />
      <InputTagField :tag="false" label="主题：" v-model="mailFormModel.subject" />
      <van-divider style="margin: 0" />
<!--      <van-field style="padding: 0" type="textarea" name="内容" v-model="mailFormModel.content" :rows="10" autosize></van-field>-->
      <Editor></Editor>
    </van-space>
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
import InputTagField from '@/components/InputTagField/index.vue'
import Editor from '@/components/Editor/index.vue'

interface TagsProps {
  value: string
  valid: boolean
}

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

const mailFormModel = reactive<{ from: string, receiver: TagsProps[], subject: string, content: string }>({
  from: '聂明旺<1984607221@qq.com>',
  receiver: [],
  subject: '',
  content: '\n\n发自我的iPhone',
})

const subject = computed(() => {
  return mailFormModel.subject || '新邮件'
})

const canSend = computed(() => {
  return mailFormModel.from && mailFormModel.receiver && mailFormModel.subject && mailFormModel.content
})

function onReceiverChange(val: TagsProps[]) {
  mailFormModel.receiver = val
}

function onOpen() {
  document.documentElement.style.overflow = 'hidden'
}

function onClose() {
  document.documentElement.style.overflow = 'auto'
}

const showWarning = ref(false)

function handleBeforeClose() {
  if (mailFormModel.from || mailFormModel.receiver.length || mailFormModel.subject) {
    showWarning.value = true
    return false
  } else {
    return true
  }
}

function onWarnSelect(val: string) {
  console.log(val);
  showWarning.value = false
  show.value = false
}
</script>

<style>
.new-mail-sheet {
  height: 95% !important;
  overflow-x: hidden;
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
  font-size: 28px;
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
