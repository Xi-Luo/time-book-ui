<template>
  <div id="app" style="margin-top: 0%">
    <el-container ref="homePage">
      <el-header>
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
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clientHeight: '',
      navList: [
        {name: '/home', navItem: '我的首页'},
        {name: '/book', navItem: '预约管理'},
        {name: '/account', navItem: '我的账号'}
      ] }
  },
  mounted () {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp () {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeFixed (clientHeight) {
      // console.log(clientHeight);
      // console.log(this.$refs.homePage.$el.style.height);
      this.$refs.homePage.$el.style.height = clientHeight - 20 + 'px'
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
