<template>
  <div id="app">
    <el-menu
      :default-active="this.$route.path"
      router mode="horizontal"
      class="el-menu-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span> {{ item.navItem }}</span>
        </template>
      </el-menu-item >
    </el-menu>
    <router-view class="menu-right"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      navList: [
        {name: '/home', navItem: '我的首页'},
        {name: '/book', navItem: '预约管理'},
        {name: '/account', navItem: '我的账号'}
      ] }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
  .menu-right{
    margin-left:200px;
  }
  /*#app {*/
  /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*  margin-top: 60px;*/
  /*}*/
</style>
