<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import Header from "@/views/Mail/Header/index.vue";
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
</script>

<template>
  <section class="app-main-wrapper">
    <main class="app-main">
      <van-config-provider :theme-vars="themeVars" theme-vars-scope="global">
        <Header />
        <RouterView v-slot="{ Component }">
          <Transition :name="route.meta.transition as string" mode="out-in" :appear="false">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </van-config-provider>

      <NewMailSheet></NewMailSheet>

      <van-back-top right="5vw" bottom="10vh" />
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
  min-height: 100vh;
  background-color: #ffffff;
  font-size: 16px;
  overflow: hidden;
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

</style>
