import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router';

interface tab {
  path: string
  meta: object
  name: string
  keepAliveName: string
  title: string
}

export default defineStore('coal_mine_tabs', () => {
  const tabs = ref<tab[]>([])
  const currentTab = ref<tab>()
  const preTab = ref<tab>()
  const count = ref<number>(0)
  const keepAliveNames = computed(() => tabs.value.map((item: tab) => item.keepAliveName))
  // 是否存在path
  const hasPath = (path: string) => {
    return tabs.value.find((item: tab) => item.path === path)
  }
  // 添加tab
  const addTab = (tab: tab) => {
    count.value++
    const { path } = tab
    const routeTab = hasPath(path)
    if (!routeTab) {
      tabs.value.push(tab)
    }
    currentTab.value = tab
  }
  // 删除
  const removeTab = (path: string) => {
    const index = tabs.value.findIndex((item: tab) => item.path === path)
    if (index === -1) return
    const currentPath = currentTab.value?.path
    // 关闭是否时当前页面
    const isCurrent = path === currentPath
    // debugger
    preTab.value = tabs.value.splice(index, 1)[0]
    console.log(preTab.value)
    // 如果关闭的是最后一个tab 当前页面保持不变
    if (tabs.value.length == 0) return
    // 如果关闭当前页面是第一个
    if (isCurrent && index === 0) {
      currentTab.value = tabs.value[0]
      router.replace(currentTab.value.path)
      return
    }
    // 如果关闭的是当前tab
    if (isCurrent) {
      currentTab.value = tabs.value[index - 1]
      router.replace(currentTab.value.path)
    }
  }
  // // tab切换
  const tabChange = async (path: string) => {
    currentTab.value = hasPath(path)
    router.push(path)
  }
  return {
    tabs,
    preTab,
    currentTab,
    addTab,
    removeTab,
    count,
    keepAliveNames,
    tabChange
  }
})