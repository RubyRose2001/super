<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import scSubSideMenu from './component/scSubSideMenu.vue'
import useStore from '@/stores/router/index'
import useTabStore from '@/stores/tabs/index'
const store = useStore()
const tabStore = useTabStore()
const route = useRoute()

const fullPath = ref<string>(route.fullPath)

watch(tabStore, (store) => {
  if (!store.currentTab) return
  fullPath.value = store.currentTab.path
})

</script>
<template>
  <div class="sc-menu">
    <el-menu
      :default-active="fullPath"
      class="el-menu-vertical-demo">
      <template
        v-for="route in store.currentRouter"
        :key="route.path">
        <sc-sub-side-menu
          :full-path="route.path"
          :subRoute="route">
        </sc-sub-side-menu>
      </template>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.sc-menu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  :deep(.el-menu) {
    border-right: none;
  }
}
</style>