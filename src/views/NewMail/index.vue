<template>
  <section>
    <van-sticky :offset-top="44">
      <van-nav-bar
          :title="showTitle ? '新邮件' : ''"
          :left-text="systemStore.mailKind"
          @click-left="onClickLeft"
          left-arrow
          :border="false"
          :right-disabled="!canSend"
      >
        <template #right>
          <van-icon v-show="showTitle" :name="canSend ? Icons.arrowUpActive: Icons.arrowUp" :size="26" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="mail-title" ref="titleRef">
      <div class="action-title">
        <span>新邮件</span>
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

    <van-action-sheet cancel-text="取消" v-model:show="show" :actions="actions" @select="onSelect"
                      style="font-weight: bold"
                      close-on-click-action />
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import type { FieldInstance, ActionSheetAction } from 'vant';
import { useSystemStore } from "@/store/system.ts";
import Icons from '@/assets/icons/svgs/index.ts'
import { useElementBounding } from "@vueuse/core";

const receiverRef = ref<FieldInstance>()
const router = useRouter();
const systemStore = useSystemStore()

const mailFormModel = reactive({
  from: '',
  receiver: '',
  subject: '',
  content: '\n\n发自我的iPhone',
})

const titleRef = ref(null)
const showTitle = ref(false)
onMounted(() => {
  const {top} = useElementBounding(titleRef.value)
  watch(top, (value) => {
    showTitle.value = value <= 36
  })

  // 防止页面闪烁
  setTimeout(() => {
    receiverRef.value?.focus()
  }, 50)
})

const canSend = computed(() => {
  return mailFormModel.from && mailFormModel.receiver && mailFormModel.subject && mailFormModel.content
})

function onClickLeft() {
  if (mailFormModel.from || mailFormModel.receiver || mailFormModel.subject) {
    show.value = true
  } else {
    router.back()
  }
}

const show = ref(false)
const actions = [
  {name: '删除草稿', color: '#ee0a24'},
  {name: '保存草稿', color: '#1989fa'},
];

function onSelect(val: ActionSheetAction) {
  console.log(val);
  setTimeout(() => {
    router.back()
  }, 300)
}
</script>

<style>
.van-nav-bar--fixed {
  max-width: 540px;
  margin: 0 auto;
  top: var(--top-bar-height) !important;
  right: 0;
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
</style>
