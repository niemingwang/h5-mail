import { App } from "vue";
import touched from './touch.ts'

const install = (app: App) => {
  app.directive('touched', touched)
}

export default install
