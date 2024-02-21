<script lang="ts" setup>
import { ref } from 'vue'
import headerNav from './components/headerNav/index.vue'
import hxTabs from './components/tabs/index.vue'
import ScMenu from './components/menu/index.vue'
import useTabStore from '@/stores/tabs/index'
const store = useTabStore()
const isFold = ref<boolean>(false)
const expand = ref<boolean>(false)
let timer: any = null
const isfold = () => {
  isFold.value = !isFold.value
}
const enterSide = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    expand.value = true
  }, 1000)
}
const leaveSide = () => {
  if (!timer) return
  clearTimeout(timer)
  timer = timer = setTimeout(() => {
    expand.value = false
    if (timer) clearTimeout(timer)
  }, 3000)
}
</script>

<template>
  <div class="hx-layout">
    <div class="hx-layout__header">
      <div class="hx-layout__logo">
        <img
          class="logo"
          src="@/assets/images/logo/logo.png" alt="logo" />
      </div>
      <header-nav></header-nav>
    </div>
    <div class="hx-layout__container">
      <div class="hx-layout__transition">
        <div
          class="hx-layout__menus"
          :class="!isFold ? 'hx-layout__menus_expand' : 'hx-layout__menus_fold'">
          <sc-menu></sc-menu>
        </div>
        <div
          @mouseenter="enterSide"
          @mouseleave="leaveSide"
          class="side">
          <transition name="fold">
            <el-icon
              v-if="expand"
              @click="isfold"
              class="icon">
              <i-ep-fold v-if="!isFold"/>
              <i-ep-expand v-else/>
            </el-icon>
          </transition>
        </div>
      </div>
      <div class="hx-layout__main">
        <div class="hx-layout__router">
          <div class="hx-layout__tabs">
            <hx-tabs></hx-tabs>
          </div>
          <div class="sc_layout__container">
            <router-view v-slot="{ Component }">
              <template v-if="Component">
                  <Transition name="fade" mode="out-in">
                    <KeepAlive :include="store.keepAliveNames">
                      <Suspense>
                        <component :is="Component" />
                        <template #fallback>
                          正在加载...
                        </template>
                      </Suspense>
                    </KeepAlive>
                  </Transition>
              </template>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
// 设置变量
@log_and_menu_width: 250px;
.hx-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .hx-layout__header {
    width: 100%;
    background-color: var(--logo-bg-color);
    min-height: 68px;
    display: flex;
    overflow: hidden;
    .hx-layout__logo {
      width: @log_and_menu_width;
      height: 100%;
      background-color: var(--logo-bg-color);
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        width: 81px;
      }
    }
  }
  .hx-layout__container {
    display: flex;
    flex: 1;
    // overflow: hidden;
    .hx-layout__transition {
      position: relative;
      .side {
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        right: -5px;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .icon {
          font-size: 20px;
          transform: translateX(10px);
          cursor: pointer;
        }
      }
    }
    .hx-layout__menus {
      width: @log_and_menu_width;
      height: 100%;
      background-color: var(--menu-bg-color);
      transition: all 0.3s ease-out;
      &.hx-layout__menus_fold{
        transform: translate3d(-100%, 0, 0);
        width: 0;
      }
      &.hx-layout__menus_expand{
        transform: translate3d(0, 0, 0);
      }
    }
    .hx-layout__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      .hx-layout__router {
        flex: 1;
        overflow: hidden;
        background-color: var(--container-bg-color);
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        flex-direction: column;
        .hx-layout__main {
          background-color: #fff;
        }
        .sc_layout__container {
          width: 100%;
          height: 100%;
          background-color: #fff;
          flex: 1;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .fold-enter-active,
  .fold-leave-active {
    transition: opacity .3s ease;
  }
  .fold-enter-from,
  .fold-leave-to {
    opacity: 0;
  }
}
</style>
