<script lang="ts" setup>
</script>
<template>
  <div class="layout_header_nav">
    <div class="menu_settings">
      <el-icon class="icon"><i-ep-menu /></el-icon>
    </div>
    <div class="menu_settings-right">
      <el-icon class="setting"><i-ep-setting /></el-icon>
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout_header_nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  box-sizing: border-box;
  padding-right: 30px;
  .menu_settings {
    width: 70px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.actived {
      background-color: #fff;
      .icon {

      }
    }
    .icon {
      font-size: 25px;
      background-color: #fff;
    }
  }
  .menu_settings-right {
    .setting {
      font-size: 28px;
      color: #0174e9;
    }
  }
}
</style>