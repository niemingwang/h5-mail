<template>
  <div class="email-cell" :style="emailCellStyle">
    <div v-if="isEdit" class="email-cell__edit">
      <van-checkbox :model-value="checked" />
    </div>
    <div class="email-cell__content"
         @touchstart="onTouchStart"
         @touchend="onTouchEnd"
         @touchmove="onTouchMove"
         :style="emailCellStyle"
    >
      <div class="email-cell__badge">
        <van-badge
            v-show="email.status === 'unread'"
            dot
            color="#1989fa"
        />
      </div>
      <div class="email-cell__title">
        <span>{{ email.from }}</span>
        <span>
          {{ email.date }}
          <van-icon name="arrow" v-show="!isEdit" />
        </span>
      </div>
      <div class="email-cell__subject">
        <van-text-ellipsis :content="email.subject" :key="isEdit.toString()" />
      </div>
      <div class="email-cell__body">
        <van-text-ellipsis :content="email.body" :rows="2" :key="isEdit.toString()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, ref, computed } from 'vue'

type Email = {
  id: string,
  subject: string,
  body: string,
  from: string,
  date: string
  status: string
}

const props = defineProps({
  email: {
    type: Object as PropType<Email>,
    required: true
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  }
})

const emailCellStyle = computed(() => {
  return {
    backgroundColor: props.isEdit ? (props.checked ? '#f2f3f5' : '#ffffff') : touched.value ? '#f2f3f5' : '#ffffff'
  }
})

const touched = ref(false)

function onTouchStart() {
  touched.value = true
}

function onTouchEnd() {
  touched.value = false
}

function onTouchMove() {
  touched.value = false
}
</script>

<style scoped>
.email-cell {
  display: flex;
  align-items: center;
  gap: 5px;
}

.email-cell__edit {
  margin-left: 15px;
}

.email-cell__content {
  position: relative;
  width: 100%;
  min-height: 46px;
  display: flex;
  flex-direction: column;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  overflow: hidden;
  color: var(--van-cell-text-color);
  font-size: 15px;
  line-height: var(--van-cell-line-height);
  background: var(--van-cell-background);
}

.email-cell__badge {
  position: absolute;
  top: 14px;
  left: 1px;
}

.email-cell__title {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    flex: 1;
    font-size: var(--van-cell-label-font-size);
  }

  span:nth-child(1) {
    font-size: 17px;
    font-weight: bold;
  }

  span:nth-child(2) {
    font-size: 14px;
    text-align: right;
    color: var(--van-cell-label-color);
  }
}

.email-cell__body {
  margin-top: var(--van-cell-label-margin-top);
  color: var(--van-cell-label-color);
  font-size: 14px;
  line-height: var(--van-cell-label-line-height);
}
</style>
