<script setup lang="ts">
import { reactive ,ref} from 'vue'
import { useRoute } from 'vue-router'
// import Header from "@/components/Header/index.vue";
import NewMailSheet from '@/components/NewMailSheet/index.vue'

const route = useRoute()

const themeVars = reactive({
  searchActionTextColor: '#1989fa',
  buttonWarningBackground: '#f99600',
  overlayBackground: 'rgba(0,0,0,0.2)',
  navBarTitleFontSize: '17px',
  buttonDefaultHeight: '36px',
  buttonRadius: '8px'
})

// 控制动画
const isAnimation = ref(false)
/**
 * 动画开始
 */
const beforeEnter = () => {
  console.log(1);
  isAnimation.value = true
}
/**
 * 动画结束
 */
const afterLeave = () => {
  console.log(2);
  isAnimation.value = false
}
</script>

<template>
  <section class="app-main-wrapper">
    <main class="app-main">
      <van-config-provider :theme-vars="themeVars" theme-vars-scope="global" style="height: 100%">
<!--        <Header />-->
        <RouterView v-slot="{ Component }">
          <Transition :name="route.meta.transition as string" @before-enter="beforeEnter"
                      @after-leave="afterLeave">
            <KeepAlive>
              <component :is="Component" :class="{ 'fixed-page': isAnimation && route.meta.transition }"/>
            </KeepAlive>
          </Transition>
        </RouterView>
      </van-config-provider>

      <NewMailSheet></NewMailSheet>
    </main>
  </section>
</template>

<style scoped>
.app-main-wrapper {
  margin: 0 auto;
  max-width: 540px;
}

.app-main {
  max-width: 540px;
  height: 100vh;
  background-color: #ffffff;
  font-size: 16px;
  overflow: hidden;
  position: relative;
}

.fixed-page {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.15s;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-enter-to {
  transform: translateX(0);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-enter-to {
  transform: translateX(0);
}


.slide-left-leave-from {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-leave-from {
  transform: translateX(0);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

</style>
