<template>
<div>
  <p>全部预约事件：</p><br>
  <el-card class="box-card" v-for="item in booklist" :key="item">
<!--    <div v-for="(value,key) in item" :key="(value , key)" class="text item">-->
    <div v-for="(value,key) in item" :key="value" class="text item">
     <span class="keystyle"> {{key}}:&nbsp;&nbsp;</span>
      <span>{{value}}</span>
    </div>
  </el-card>

</div>
</template>

<script>
export default {
  name: 'bookShow',
  data () {
    return {
      id: '',
      booklist: [],
      timelist: []
    }
  },
  created () {
    this.fun()
  },
  methods: {
    fun () {
      const url = 'http://localhost:8080/v1/time/init/' + this.global.id
      console.log(url)
      this.axios.get(url).then(res => {
        console.log(res.data)
        this.timelist = res.data.timesList
        console.log('this is qianduan tl', this.timelist)
        console.log('end!')
        for (let i = 0; i < this.timelist.length; i++) {
          if (this.timelist[i].isfree === 1) {
            this.booklist.push(this.timelist[i])
          }
        }
      }).catch(err => { console.log(err) })
      // 遍历时间表数组，把isfree为false的加入到booklist数组中
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin-bottom: 15px;
  }
  .keystyle{
    font-size: 18px;
    color: firebrick;
  }
</style>
