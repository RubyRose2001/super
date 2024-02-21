import { defineStore } from 'pinia'
import { ref } from 'vue'
import { asyncComponent, constantRoutes } from '@/router'


export default defineStore('coal_mine_router', () => {
  const routerMapHash = ref<any>({})
  const routerkey = ref<string>()
  const currentRouter = ref<any[]>([])
  const addRouter = (key, routers)=> {
    routerMapHash[key] = routers
  }
  // 测试数据
  const test = [...asyncComponent, ...constantRoutes]
  addRouter('test', test)
  
  const changeRouter = (key) => {
    // 不存在抛出异常
    if(!routerMapHash[key]) {
      throw new Error('不存在该路由')
    }
    routerkey.value = key
    currentRouter.value = routerMapHash[key]
  }
  changeRouter('test')
  return {
    routerkey,
    currentRouter,
    addRouter,
    changeRouter
  }
})