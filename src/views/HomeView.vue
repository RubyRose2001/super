<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { login } from '@/api/login'
import { ref } from 'vue'
const count = ref(0)
const router = useRouter()
const route = useRoute()
console.log(route)
const about = () => {
  console.log('about')
  router.push('/about')
}
const loginFn = async () => {
  try {
    const data = await login({
      account: 18518692717,
      password: 123456,
      roleType: 3
    })
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <main class="main">
    <el-button @click="about">Default</el-button>
    <el-button @click="loginFn">login</el-button>
    <el-input v-model="count"></el-input>
    <TheWelcome />
  </main>
</template>

<style lang="less" scoped>
</style>