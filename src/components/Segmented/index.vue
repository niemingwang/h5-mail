<template>
  <div class="segmented-main">
    <div class="segmented-group" ref="segmentedGroupRef">
      <label
          :class="['segmented-item', selectedIndex === index ? 'segmented-item-selected' : '']"
          v-for="(option, index) in options"
          :key="index"
          @click="onOptionClick(index)"
      >
        <span class="segmented-item-label">{{ option }}</span>
      </label>
      <div class="segmented-thumb" :style="thumbStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, defineEmits, nextTick } from 'vue'
import { useRect } from '@vant/use'

const emits = defineEmits(['change'])

const props = defineProps({
  options: {
    type: Array,
    default: () => ['全部', '主题', '收件人', '发件人']
  }
})

const selectedIndex = ref(0)
const segmentedGroupRef = ref<HTMLElement | null>(null)
const thumbLeft = ref(0)
const thumbWidth = ref(0)

function onOptionClick(index: number) {
  if (index !== selectedIndex.value) {
    updateThumbPosition(index)
    selectedIndex.value = index
    emits('change', props.options[index])
  }
}

function updateThumbPosition(index: number) {
  if (!segmentedGroupRef.value) return

  const selectedItem = segmentedGroupRef.value.children[index] as HTMLElement
  const { left, width } = useRect(selectedItem)

  thumbLeft.value = left - segmentedGroupRef.value.getBoundingClientRect().left
  thumbWidth.value = width
}

const thumbStyle = computed(() => ({
  transform: `translateX(${thumbLeft.value}px)`,
  width: `${thumbWidth.value}px`
}))

nextTick(() => {
  updateThumbPosition(selectedIndex.value)
})
</script>

<style scoped>
.segmented-main {
  margin: 0 10px 10px;
  padding: 2px;
  display: inline-block;
  background-color: #f2f3f5;
  border-radius: 6px;
}

.segmented-group {
  width: 100%;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-items: flex-start;
}

.segmented-item {
  cursor: pointer;
  z-index: 2;
  flex: 1;
  position: relative;
  text-align: center;
  border-radius: 6px;
  transform: translateZ(0);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    inset-inline-start: 0;
    border-radius: inherit;
    transition: background-color 0.2s;
    pointer-events: none;
  }
}

.segmented-item-selected {
  color: rgba(0, 0, 0, 0.88);
}

.segmented-item-label {
  position: relative;
  z-index: 2;
  min-height: 30px;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.segmented-thumb {
  position: absolute;
  top: 0;
  height: 30px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border-radius: 6px;
  transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
