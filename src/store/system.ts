import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state() {
    return {
      is_edit: false,
      mail_kind: '收件箱',
      new_mail: false
    }
  },
  actions: {
    // 这里存放方法
    changeEdit() {
      this.is_edit = !this.is_edit
    },
    changeMailKind(kind: string) {
      this.mail_kind = kind
    },
    changeNewMailState(state: boolean) {
      this.new_mail = state
    }
  },
  getters: {
    // 这里存放计算属性
    isEdit: (state) => state.is_edit,
    mailKind: (state) => state.mail_kind,
    newMail: (state) => state.new_mail
  },
})
