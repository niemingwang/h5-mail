<template>
  <section class="mail-list-box">
    <Navbar @select-all="onSelectedAll" :is-selected-all="isSelectedAll"
            :selected-count="selectedIds.length" :border="showTitle" />

    <div class="mail-title">
      <section v-if="!focus">
        <span>{{ isEdit && selectedIds.length ? `已选中 ${selectedIds.length} 封邮件` : systemStore.mailKind }}</span>
        <span class="mail-title--desc">
          <van-text-ellipsis :content="mailList.length + ` 封邮件` +  (unread ? `（${unread} 封未读邮件）` : '')" />
        </span>
      </section>
      <section v-else>
        <span>{{ `在“${systemStore.mailKind}”内搜索` }}</span>
      </section>
    </div>

    <!--  搜索  -->
    <van-search v-show="!isEdit" @focus="focus = true" @cancel="focus = false" :show-action="focus" placeholder="搜索" />
    <Segment v-if="focus && !isEdit" @change="onSegmentChange" />
    <van-divider style="margin: 0; padding: 0 16px" />

    <van-list style="overflow: hidden auto; z-index:1; padding-bottom: 20px" @load="onLoad" v-model:loading="loadMore"
              safe-area-inset-bottom>
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <EmailList :mails="mailList" @checked-change="handleChecked" :selected-ids="selectedIds"
                   @mail-click="omMailClick" @remove="handleMailRemove" @toggle-read-status="handleToggleReadStatus"/>
      </van-pull-refresh>

      <!--   回到顶部   -->
      <van-back-top right="5vw" bottom="10vh" />

    </van-list>

    <ActionBar v-show="systemStore.isEdit" style="z-index: 2">
      <template #left>
        <MailMark :selected-mail="selectedMails"></MailMark>
      </template>
      <template #center>
        <MailMove :selected-mail="selectedMails"></MailMove>
      </template>
      <template #right>
      <span :class="['text-button', selectedIds.length ? '' : 'disabled']" v-if="isEdit"
            @click="selectedIds.length && onDelete()">删除</span>
        <van-icon v-else :name="Icons.edit" :size="24" @click="createNewMail" />
      </template>
    </ActionBar>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'
import Navbar from '@/views/Inbox/Navbar/index.vue'
import EmailList from '@/components/EmailList/index.vue'
import ActionBar from '@/components/ActionBar/index.vue'
import emails from '@/mock/emails.ts'
import { useSystemStore } from "@/store/system.ts";
import { useRouter } from "vue-router";
import Icons from "@/assets/icons/svgs";
import Segment from '@/components/Segmented/index.vue'
import MailMove from '@/components/MailMove/index.vue'
import MailMark from '@/components/MailMark/index.vue'
import type { Mail } from '@/types.ts'

const mailList = ref(emails)

const showTitle = ref(false)
const systemStore = useSystemStore()
const router = useRouter()

const loading = ref(false);
const focus = ref(false)
const onRefresh = () => {
  setTimeout(() => {
    // @ts-ignore eslint-disable-next-line no-undef
    showToast('刷新成功');
    loading.value = false;
  }, 1000);
};

const selectedIds: Ref<Mail['id'][]> = ref([])
const selectedMails: Ref<Mail[]> = ref([])
const isSelectedAll = computed(() => {
  return selectedIds.value.length === emails.length
})
watch(() => systemStore.isEdit, (newValue) => {
  if (newValue) {
    selectedIds.value = []
  }
})

function handleChecked(email: Mail) {
  if (selectedIds.value.includes(email.id)) {
    selectedIds.value = selectedIds.value.filter(id => id !== email.id)
    selectedMails.value = selectedMails.value.filter(mail => mail.id !== email.id)
  } else {
    selectedIds.value.push(email.id)
    selectedMails.value.push(email)
  }
}

function onSelectedAll(all: boolean) {
  if (all) {
    selectedIds.value = emails.map(email => email.id)
  } else {
    selectedIds.value = []
  }
}

function createNewMail() {
  systemStore.changeNewMailState(true)
}

const unread = computed(() => {
  return mailList.value.reduce((acc, cur) => {
    return acc + (cur.status === 'unread' ? 1 : 0)
  }, 0)
})

const isEdit = computed(() => {
  return systemStore.isEdit
})

function onDelete() {
  console.log(selectedIds.value);
}

const loadMore = ref(false)

function onLoad() {
  loadMore.value = true
}

function omMailClick(mail: Mail) {
  router.push(`/inbox/${mail.id}`)
}

function handleMailRemove(mail: Mail) {
  mailList.value.splice(mailList.value.findIndex(item => item.id === mail.id), 1)
}

// 切换已读/未读
function handleToggleReadStatus(mail: Mail)  {
  mail.status = mail.status === 'unread' ? 'read' : 'unread'
}

function onSegmentChange(val: string) {
  console.log(val);
}
</script>

<style scoped>
.mail-title {
  background-color: #ffffff;
  padding: 6px 16px;
  font-size: 21px;
  font-weight: bold;
}

.mail-title--desc {
  font-weight: normal;
  color: var(--van-cell-label-color);
  font-size: 14px;
}

.filter-mode {
  font-size: 12px;
}

.filter-way {
  font-size: 12px;
  color: #1989fa;
}
</style>
