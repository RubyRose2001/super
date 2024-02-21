<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { computed, defineProps, ref } from 'vue'
import { resolveRoutePath } from '@/utils/path'
import ScSubMenu from './ScSubMenu.vue'
import ScSubMenuItem from './ScSubMenuItem.vue'
import scSubSideMenu from './scSubSideMenu.vue'
interface RouteRecordRawPlus extends Omit<RouteRecordRaw, 'children'>  {
  children?: RouteRecordRawPlus[]
  hidden?: boolean,
  meta: {
    icon?: string,
    title: string,
    hidden?: boolean,
  }
}
interface Props {
  fullPath: string
  subRoute: RouteRecordRawPlus
}
const props = defineProps<Props>()
const routeChildren  = ref([])

const showChildren = (children, parent) => {
  if (!children) children = []
  const showChildren = children.filter((item) => !item.meta.hidden)
  routeChildren.value = showChildren
  if (showChildren.length >= 1) return true

  if (showChildren.length === 0) return false
  return false
}
const menuType = computed(() => {
  if (showChildren(props.subRoute.children, props.subRoute)) {
    return ScSubMenu
  } else {
    return ScSubMenuItem
  }
})
const handlePath = (path) => {
  return resolveRoutePath(props.fullPath, path)
}
</script>
<template>
  <component
    :is="menuType"
    v-if="!subRoute.meta?.hidden"
    :subRoute="subRoute"
    :full-path="fullPath"
    :route-children="routeChildren">
    <template v-if="subRoute.children && subRoute.children.length">
      <sc-sub-side-menu
        v-for="route in subRoute.children"
        :key="route.path"
        :sub-route="route"
        :full-path="handlePath(route.path)">
      </sc-sub-side-menu>
    </template>
  </component>
</template>
