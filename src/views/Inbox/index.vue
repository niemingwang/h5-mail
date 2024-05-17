<template>
  <section class="mail-list-box">
    <Navbar @select-all="onSelectedAll" :is-selected-all="isSelectedAll"
            :selected-count="selectedIds.length" :border="showTitle" />

    <div class="mail-title" :style="{display: focus ? 'none' : 'block'}">
      <span>{{ isEdit && selectedIds.length ? `已选${selectedIds.length}封` : systemStore.mailKind }}</span>
      <span class="mail-title--desc">
          <van-text-ellipsis :content="emails.length + ' 封邮件'" />
        </span>
    </div>

    <van-divider style="margin: 0; padding: 0 16px" />
    <van-search @focus="focus = true" @blur="focus = false" :show-action="focus" placeholder="搜索" />
    <van-divider style="margin: 0; padding: 0 16px" />

    <van-list style="overflow: hidden auto;z-index:1;padding-bottom: 20px" @load="onLoad" v-model:loading="loadMore"
              safe-area-inset-bottom>
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <EmailList :mails="emails" @checked-change="handleChecked" :selected-ids="selectedIds"
                   @mail-click="omMailClick" />
      </van-pull-refresh>

      <van-back-top right="5vw" bottom="10vh" />

    </van-list>

    <ActionBar v-show="systemStore.isEdit" style="z-index: 2">
      <template #left>
        <van-icon :name="Icons.filterFill" size="26" />
      </template>
      <template #center>
        <van-space direction="vertical" :size="-2" align="center">
          <span class="filter-mode">过滤方式：</span>
          <span class="filter-way">未读</span>
        </van-space>
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

type Email = {
  id: string,
  subject: string,
  body: string,
  from: string,
  date: string,
  status: string
}

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

const selectedIds: Ref<Email['id'][]> = ref([])
const isSelectedAll = computed(() => {
  return selectedIds.value.length === emails.length
})
watch(() => systemStore.isEdit, (newValue) => {
  if (newValue) {
    selectedIds.value = []
  }
})

function handleChecked(email: Email) {
  if (selectedIds.value.includes(email.id)) {
    selectedIds.value = selectedIds.value.filter(id => id !== email.id)
  } else {
    selectedIds.value.push(email.id)
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

function omMailClick(mail: Email) {
  router.push(`/inbox/${mail.id}`)
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
