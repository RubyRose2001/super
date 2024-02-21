<script setup lang="ts">
import { defineProps } from 'vue';
import { type RouteRecordRaw, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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
}

const props = defineProps<Props>()
const push = () => {
  if (route.fullPath === props.fullPath) return
  router.push(props.fullPath)
}
</script>

<template>
  <div
    @click="push"
    class="sc-sub-menu-item">
    <el-icon v-if="subRoute?.meta?.icon">
      <component :is="subRoute?.meta.icon"></component>
    </el-icon>
    <el-menu-item
      :index="fullPath">
      {{ subRoute.meta.title }}
    </el-menu-item>
  </div>
</template>