<template>
  <div>
    <!-- 此处注意写法v-model:content -->
    <QuillEditor ref="myQuillEditor"
                 theme="snow"
                 v-model:content="content"
                 :options="data.editorOption"
                 contentType="html"
                 @update:content="setValue()"
    />
    <!-- 使用自定义图片上传 -->
    <input type="file" hidden accept=".jpg,.png" ref="fileBtn" @change="handleUpload" />
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { reactive, onMounted, ref, toRaw, watch } from 'vue'

const props = defineProps(['value'])
const emit = defineEmits(['updateValue'])
const content = ref('')
const myQuillEditor = ref()
// 通过watch监听回显，笔者这边使用v-model:content 不能正常回显
watch(() => props.value, (val) => {
  toRaw(myQuillEditor.value).setHTML(val)
}, {deep: true})
const fileBtn = ref()
const data = reactive({
  content: '',
  editorOption: {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        // [{ 'font': [] }],
        [{'align': []}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        // [{ 'header': 1 }, { 'header': 2 }],
        // ['image'],
        // [{ 'direction': 'rtl' }],
        [{'color': []}, {'background': []}],
        [{'size': ['small', false, 'large', 'huge']}],
      ]
    },
    placeholder: '请输入内容...'
  }
})
const imgHandler = (state: any) => {
  if (state) {
    fileBtn.value.click()
  }
}
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {
  const text = toRaw(myQuillEditor.value).getHTML()
  console.log(text);
}
const handleUpload = () => {
  console.log('???');
}
// 初始化编辑器
onMounted(() => {
  const quill = toRaw(myQuillEditor.value).getQuill()
  if (myQuillEditor.value) {
    quill.getModule('toolbar').addHandler('image', imgHandler)
    myQuillEditor.value.getQuill().blur()
  }
})
</script>
<style>
.ql-editor {
  padding: 12px 10px;
}

.ql-toolbar.ql-snow {
  border: none;
  padding: 0;
}

.ql-formats {
  margin: 5px 0;
}

.ql-container.ql-snow {
  border: none;
}

.ql-size {
  width: 60px !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "默认";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "小";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "中";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "大";
}
</style>

