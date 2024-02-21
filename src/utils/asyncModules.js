// import userCoalMineTabs from '@/stores/tabs/index'
// import { pinia } from '@/utils/pinia'

// const store = userCoalMineTabs(pinia)

export const asyncModules = (router) => {
  return router.map((route) => {
    const { path, name, component, meta, children, redirect } = route
    let comp = component
    // 判断component是否是函
    if (meta?.async) {
      // 非defineAsyncComponent 注册方法
      comp = () => new Promise((resolve) => {
        component().then((comp) => {
          if (meta.ispane) {
          // 重命名组件
            if(!redirect) {
              // 防止命名重复
              comp.default.__name = name + '_' + comp.default.__name;
              // meta.keepAliveName = comp.default.__name;
              // store.addTab({
              //   path,
              //   name,
              //   meta,
              //   title: meta.title,
              //   keepAliveName: comp.default.__name,
              // })
            }
          }
          resolve(comp.default)
        })
      })
    }
    const result = {
      name,
      path,
      component: comp,
      meta,
      redirect,
      children: []
    }
    if (children && children instanceof Array) {
      result.children = asyncModules(children)
    }
    return result
  })
}