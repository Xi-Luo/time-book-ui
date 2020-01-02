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
      booklist: [],
      timelist: [
        {
          date: '2019-01-01',
          start_time: '08:00',
          end_time: '10:00',
          event: '事件一',
          isfree: true
        },
        {
          date: '2019-01-02',
          start_time: '08:00',
          end_time: '12:00',
          event: '事件二',
          isfree: false
        },
        {
          date: '2019-01-06',
          start_time: '10:00',
          end_time: '21:00',
          event: '事件三',
          isfree: false
        },
        {
          date: '2019-01-05',
          start_time: '03:00',
          end_time: '08:00',
          event: '事件四',
          isfree: true
        },
        {
          date: '2019-01-02',
          start_time: '05:00',
          end_time: '07:00',
          event: '事件五',
          isfree: true
        }
      ]
    }
  },
  created () {
    this.fun()
  },
  methods: {
    fun () {
      // 遍历时间表数组，把isfree为false的加入到booklist数组中
      for (let i = 0; i < this.timelist.length; i++) {
        if (this.timelist[i].isfree === false) {
          var temp = {
            date: this.timelist[i].date,
            start_time: this.timelist[i].start_time,
            end_time: this.timelist[i].end_time,
            event: this.timelist[i].event
          }
          this.booklist.push(temp)
        }
      }
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
