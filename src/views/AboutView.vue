<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed, ref } from 'vue'
import stores from 'home/stores'

const store = stores.useCounterStore()
const value = ref('')
const count = computed(() => store.count)
const add = store.increment
const decrement = store.decrement
const router = useRouter()
const route = useRoute()
console.log(route)
const back = () => {
  router.push('/')
}
const test = () => {
  router.push('/test')
}
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="back">返回</el-button>
    <el-button @click="test">test</el-button>
    <div>{{ count }}</div>
    <el-button
      @click="add">add</el-button>
    <el-button @click="decrement">--</el-button>
    <el-input v-model="value"></el-input>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
