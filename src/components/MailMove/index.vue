<template>
  <TextButton :disabled="!selectedMail.length" @click="show = true">移动</TextButton>

  <van-popup teleport=".app-main" v-model:show="show" :close-on-click-overlay="false" :duration="0.25" title="移动邮件" position="bottom" round>
    <div class="mail-move-header">
      <div class="mail-move-header__left">
        <TextButton @click="show = false">取消</TextButton>
      </div>
      <div class="mail-move-header__center">
        <span>移动邮件</span>
      </div>
      <div class="mail-move-header__right">
        <TextButton :disabled="!checked" @click="onMove">移动</TextButton>
      </div>
    </div>
    <van-divider style="margin: 0" />

    <div class="mail-move-description">
      <span>选中邮件后移动到目标邮箱</span>
    </div>
    <van-divider style="margin: 0" />

    <div class="mail-move-body">
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell v-for="item in folders" :key="item.text" :title="item.text" :clickable="canMove(item.path)" @click="canMove(item.path) && (checked = item.path)">
            <template #icon>
              <van-icon :name="item.icon" :size="24" style="margin-right: 5px"/>
            </template>
            <template #right-icon>
              <van-radio :disabled="!canMove(item.path)" :name="item.path" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>

  </van-popup>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, watch, type PropType } from 'vue'
import { useRoute } from "vue-router";
import TextButton from '@/components/TextButton/index.vue'
import type { PopoverAction } from "vant";
import Icons from "@/assets/icons/svgs";
import type { Mail } from "@/types.ts";

const folders: PopoverAction[] = [
  {text: '收件箱', icon: Icons.inbox, path: '/inbox'},
  {text: '星标邮件', icon: Icons.star, path: '/star'},
  {text: '草稿箱', icon: Icons.file ,  path: '/draft'},
  {text: '已发送', icon: Icons.send ,  path: '/sent'},
  {text: '废纸篓', icon: Icons.trash ,  path: '/basket'},
];

const emits = defineEmits(['move'])

defineProps({
  selectedMail: {
    type: Array as PropType<Mail[]>,
    required: true
  }
})

const route = useRoute()
function canMove(path: string) {
  return route.path !== path
}

const show = ref(false)
const checked = ref('')

watch(show, (val) => {
  if (!val){
    checked.value = ''
  }
})

function onMove() {
  emits('move', checked.value)
  show.value = false
}
</script>

<style scoped>
.mail-move-header {
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.mail-move-body {
  padding: 10px 10px 20px;
}

.mail-move-description {
  padding: 20px;
  color: #b2b2b2;
  font-size: 14px;
  text-align: center;
}

.mail-move-header__left {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.mail-move-header__center{
  text-align: center;
  height: 56px;
  line-height: 56px;
  font-weight: bold;
  font-size: 17px;
}

.mail-move-header__right {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
