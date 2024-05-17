<template>
  <TextButton @click="onClick">
    <van-badge :content="fileList.length" :show-zero="false">
      <van-icon :name="Icons.attachment" :size="22" />
    </van-badge>
  </TextButton>

  <van-dialog v-model:show="show" :showConfirmButton="false">
    <div class="attachment-dialog">
      <van-cell-group @select="onSelect" border>
        <template #title>
          <van-space fill class="space-last-child">
            <span>附件</span>
            <TextButton style="margin-left: auto" @click="show = false">
              <van-icon name="cross" :size="14" color="#1d1d1f" />
            </TextButton>
          </van-space>
        </template>
        <van-uploader class="attachment-uploader" v-model="fileList" :after-read="handleAfterRead" name="2333"
                      result-type="file"
                      accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .jpg, .jpeg, .png"
                      :preview-image="false" :preview-full-image="false" multiple>
          <van-cell title="选择文件" is-link></van-cell>
        </van-uploader>
      </van-cell-group>
      <van-space fill :size="2" class="space-last-child">
        <van-icon :name="Icons.attachment" :size="16" style="margin-left: 10px" />
        <div class="sub-text tip">{{ fileList.length ? `${fileList.length} 个附件` : '未添加附件...' }}</div>
        <span v-show="fileList.length" class="sub-text" style="margin-left: auto; margin-right: 16px">{{
            totalSize
          }}</span>
      </van-space>
      <div v-show="fileList.length" class="attachment-files-wrapper">
        <AttachmentFilePreview v-for="file in fileList" :key="file.objectUrl" :file="file.file as File"
                               :uuid="file.message as string"
                               @remove="onAttachmentRemove" />
      </div>
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import TextButton from "@/components/TextButton/index.vue";
import AttachmentFilePreview from '@/components/AttachmentFilePreview/index.vue'
import type { UploaderFileListItem, } from 'vant';
import Icons from '@/assets/icons/svgs/index.ts'
import type { Numeric } from "vant/lib/utils";
import { formatBytes } from "@/utils/common.ts";

const show = ref(false)

function onClick() {
  show.value = true
}

function onSelect(val: string) {
  console.log(val);
}

const fileList: Ref<UploaderFileListItem[]> = ref([])

function handleAfterRead(file: UploaderFileListItem | UploaderFileListItem[], _: {
  name: Numeric;
  index: number;
}): void {
  // @ts-ignore
  if (file.length) {
    // @ts-ignore
    file.forEach(item => {
      item.message = crypto.randomUUID()
    })
  } else {
    // @ts-ignore
    file.message = crypto.randomUUID()
  }
}

function onAttachmentRemove(message: UploaderFileListItem['message']) {
  fileList.value = fileList.value.filter((item) => item.message !== message)
}

const totalSize = computed(() => {
  return formatBytes(fileList.value.reduce((acc, cur) => acc + (cur.file as File).size, 0), 0)
})
</script>

<style>
.van-uploader__input-wrapper {
  width: 100%;
}

.attachment-uploader {
  width: 100%;

  &:active {
    & div {
      background-color: var(--van-cell-active-color) !important;
    }
  }
}

.tip {
  padding: 16px 0;
}

.attachment-files-wrapper {
  display: flex;
  padding: 0 20px 20px;
  overflow: auto hidden;
}

</style>
