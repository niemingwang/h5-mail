<template>
  <div class="attachment-file-preview">
    <van-loading v-show="loading" class="file-loading" color="#0094ff" size="24px" />
    <van-icon v-show="!loading && success" class="file-loading" name="success" size="30" color="#0093fe"/>

    <TextButton class="close-btn" @click="onRemove" :disabled="loading">
      <van-icon name="cross" :size="12" color="#1d1d1f" />
    </TextButton>

    <div :class="['attachment-content', loading && 'loading']">
      <van-image height="52px" fit="contain" v-if="isImg" :src="base64" />
      <van-icon v-else :name="Icons.attachmentFile" :size="52" />
      <van-text-ellipsis :content="file.name" position="middle" rows="1" class="second-text"
                         style="width: 80px; text-align: center; margin: 2px 0" />
      <span class="sub-text">{{ fileSize }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed, defineEmits } from 'vue'
import TextButton from "@/components/TextButton/index.vue";
import Icons from "@/assets/icons/svgs";
import { formatBytes } from "@/utils/common.ts";

const emits = defineEmits(['uploaded', 'remove'])

const props = defineProps({
  file: {
    type: File,
    required: true
  },
  base64: {
    type: String
  },
  uuid: {
    type: String,
  }
})

const loading = ref(false)
const success = ref(false)

const isImg = computed(() => {
  return props.file.type.startsWith('image/')
})

const base64 = ref('')

onMounted(() => {
  loading.value = true
  if (isImg.value) {
    const fr = new FileReader()
    fr.onload = (e: ProgressEvent<FileReader>) => {
      if (e && e.target) {
        base64.value = e?.target.result as string
      }
    }
    fr.readAsDataURL(props.file)
  }
  // 附件上传
  // 上传失败直接 emits('remove', props.uuid)
  setTimeout(() => {
    loading.value = false
    success.value = true
    setTimeout(() => {
      success.value = false
    }, 500)
  }, Math.random() * 10 * 1000)
})

const fileSize = computed(() => {
  return formatBytes(props.file.size, 0)
})

function onRemove() {
  emits('remove', props.uuid)
}
</script>

<style scoped>
.attachment-file-preview {
  position: relative;
  margin-right: 30px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-loading {
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.attachment-file-preview::after {
  content: '';
  width: 100%;
  height: 100%;
  background-color: #1c1c1e;
}

.attachment-content {
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  opacity: .5;
  background-color: #e2e2e2;
}

.close-btn {
  z-index: 10;
  position: absolute;
  top: 0;
  right: -12px;
  background-color: #e2e2e2;
  border-radius: 50%;
}
</style>
