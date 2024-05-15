<template>
  <div v-if="tag" class="input-tag-field">
    <span class="input-tag-field__label">{{ label }}</span>
    <section style="flex: 1; overflow: auto">
        <span class="input-tag" @click="onInputTagClick">
        <span class="input-tag-mirror" ref="inputMirrorRef">{{ model }}</span>
        <span class="input-tag-inner">
            <van-tag
                style="margin: 2px 5px;height: 30px; font-size: 17px; white-space: nowrap"
                v-for="tag in tags"
                :key="tag.value"
                closeable
                @close="onTagClose(tag)"
                size="large"
                :color="tag.valid ? '#c0dfff' : '#fab6b6'"
                text-color="#1d1d1f"
            >
              {{ tag.value }}
            </van-tag>
          <input ref="inputRef" type="text" class="input-tag-input"
                 :style="{width: inputTagWidth + 'px'}"
                 :value="model"
                 @input="onInputChange"
                 @blur="onInputBlur"
          >
        </span>
        </span>
    </section>
    <span v-show="focused">
      <slot name="suffix"></slot>
    </span>
  </div>
  <van-field v-else class="input-field" :label-width="70" v-model="model" :name="label" :label="label"
             type="textarea" autosize center
             rows="1" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineModel, defineEmits } from 'vue'
import type { Ref } from 'vue'
import { useElementSize } from '@vueuse/core'

interface TagsProps {
  value: string
  valid: boolean
}

const emits = defineEmits(['change'])
const model = defineModel<any>()

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  tag: {
    type: Boolean,
    default: true
  }
})

const inputMirrorRef: Ref<HTMLInputElement | null> = ref(null)
const inputRef: Ref<HTMLInputElement | null> = ref(null)

const tags: Ref<TagsProps[]> = ref([])

const inputTagWidth = ref(12)

onMounted(() => {
  const {width} = useElementSize(inputMirrorRef.value)

  watch(width, (newWidth) => {
    inputTagWidth.value = newWidth + 20
  })

  inputRef.value?.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (props.tag && tags.value.length) {
        tags.value.pop()
      }
    }
  })
})

const focused = ref(false)
function onInputTagClick() {
  inputRef.value?.focus()
  focused.value = true
}

function onInputChange(e: any) {
  model.value = e.target.value
  e.target.scrollTop = e.target.scrollHeight
}

function onInputBlur(e: any) {
  if (model.value) {
    tags.value.push({
      value: model.value,
      valid: checkValid(model.value)
    })
    props.tag && (model.value = '')
  }
  e.target.scrollTop = e.target.scrollHeight
  emits('change', tags.value)
  focused.value = false
}

function onTagClose(val: TagsProps) {
  tags.value = tags.value.filter((tag) => tag.value !== val.value)
  emits('change', tags.value)
}

function checkValid(val: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(val)
}
</script>

<style>
.input-tag-field {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.input-tag-field__label {
  width: 70px;
  color: #767474;
  flex-shrink: 0;
  text-align: start;
}

.input-tag {
  font-size: 17px;
  display: inline-flex;
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  color: #1c1c1e;
  cursor: text;
  transition: color .1s cubic-bezier(0, 0, 1, 1), border-color .1s cubic-bezier(0, 0, 1, 1), background-color .1s cubic-bezier(0, 0, 1, 1);
}

.input-tag-mirror {
  position: absolute;
  top: 0;
  left: 0;
  white-space: pre;
  visibility: hidden;
  pointer-events: none;
}

.input-tag-inner {
  max-height: 70px;
  overflow: auto;
  padding-top: 2px;
  padding-bottom: 2px;
  flex: 1;
  line-height: 0;
}

.input-tag-input {
  min-width: 12px;
  height: auto;
  min-height: 24px;
  margin-top: 1px;
  margin-bottom: 1px;
  line-height: 22px;
  vertical-align: middle;
  border: none;
  outline: none;
}

.input-field {
  padding: 0;
  min-height: 40px;

  & > div:first-child {
    color: #767474;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 17px;
    margin-right: 5px;
  }

  & > div:last-child {
    height: 100%;
  }

  textarea {
    caret-color: #0b82fb;
    font-size: 17px !important;
    max-height: 200px;
  }
}
</style>
