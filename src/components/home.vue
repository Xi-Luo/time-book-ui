<template>
  <div id="book" style="margin-left: 0%">
    <el-container style="margin-left: 0%">
      <el-aside style="margin-left: 0%;width: 10%">
        <el-menu
          style="height: 100%"
          :default-openeds="['1', '3']"
          :default-active="this.$route.path"
          router mode="vertical"
          class="el-menu-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            <template slot="title"><i class="el-icon-s-platform"></i>
              <span> {{ item.navItem }}</span>
            </template>
          </el-menu-item >
        </el-menu>
      </el-aside>
      <el-main>
        <router-view class="menu-right"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      navList: [
        {name: '/timet', navItem: '时间表'},
        {name: '/books', navItem: '预约事件'}
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
      // this.$refs.homePage.$el.style.height = clientHeight - 20 + 'px'
    }
  }

}
</script>

<style scoped>
</style>
