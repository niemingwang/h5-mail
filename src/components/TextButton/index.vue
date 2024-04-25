<template>
  <button class="text-button" v-touched="['#88c0fa','#ffffff']" :style="{
    'font-size': props.size + 'px',
    'pointer-events': props.disabled ? 'none' : 'auto',
    marginLeft: atL ? showIcon ?  '-12px' : '-6px' : '',
    marginRight: atR ? showIcon ?  '-12px' : '-6px' : ''
  }">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 17
  },
  disabled: {
    type: Boolean,
    default: false
  },
  atL: {
    type: Boolean,
    default: false
  },
  atR: {
    type: Boolean,
    default: false
  },
  showIcon: {
    type: Boolean,
    default: false
  },
})

</script>

<style scoped>
.text-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
}
</style>
