<script setup lang="ts">
import { defineProps } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

interface RouteRecordRawPlus extends Omit<RouteRecordRaw, 'children'>  {
  children?: RouteRecordRawPlus[]
  hidden?: boolean,
  meta: {
    icon?: string,
    title: string
  }
}
interface Props {
  subRoute: RouteRecordRawPlus,
  fullPath: string,
  routeChildren: RouteRecordRawPlus[]
}

defineProps<Props>()

</script>

<template>
  <el-sub-menu :index="fullPath">
    <template #title>
      <el-icon v-if="subRoute?.meta?.icon">
        <component :is="subRoute?.meta?.icon"></component>
      </el-icon>
      <span>{{ subRoute?.meta?.title }}</span>
    </template>
    <slot></slot>
  </el-sub-menu>
</template>