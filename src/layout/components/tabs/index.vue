<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { toCamelCase } from '@/utils/path';
import userCoalMineTabs from '@/stores/tabs/index'
const store = userCoalMineTabs()
const route = useRoute()
const editableTabs = computed(() => store.tabs)
const activedPath = ref<string>(route.path)

watch(store, (newStore) => {
  if (!newStore.currentTab) return
  activedPath.value = newStore?.currentTab!.path
})
watch(route, () => {
  // 当路由变化时更新 currentComponent
  const { meta, path, name, fullPath } = route
  const { title, hiddenTab } = meta
  // 不展示tab
  if (hiddenTab) return
  const r = route.matched.find((item) => item.path === path && !item.redirect)
  let matchedComponent = r?.components!.default
  if (matchedComponent) {
    if (matchedComponent.name === 'AsyncComponentWrapper' && !matchedComponent['__asyncResolved']) return
    store.addTab({
      path,
      name: name as string,
      title: title as string,
      meta,
      keepAliveName: toCamelCase(fullPath),
    })
  }
}, { immediate: true })

const tabRemove = (path: any) => {
  store.removeTab(path)
}
const tabChange = (path: any) => {
  activedPath.value = path
  store.tabChange(path)
}
</script>
<template>
  <el-tabs
    v-model="activedPath"
    v-if="!route?.meta?.hiddenTab"
    type="card"
    class="sc-tabs"
    closable
    @tabChange="tabChange"
    @tabRemove="tabRemove">
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.path"
      :label="item.title"
      :name="item.path">
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="less" scoped>
.sc-tabs {
  width: 100%;
  /deep/ .el-tabs__header {
    border-bottom: none!important;
  }
  /deep/ .el-tabs__nav{
    border: none!important;
  }
  /deep/ .el-tabs__header {
    margin-bottom: 0;
  }
  /deep/ .el-tabs__item {
    background-color: #fff;
  }
}
</style>
