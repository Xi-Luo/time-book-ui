<template>
  <div>
    <!--    选择空闲时间对话框-->
    <el-button round type="text" @click="dialogVisible = true">添加空闲时间</el-button>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <p class="textstyle">只能选择最近七天</p><br>
        <el-date-picker
          v-model="pickDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <el-time-select
          placeholder="起始时间"
          v-model="pickstartTime"
          :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00'
    }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="pickendTime"
          :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '24:00',
      minTime: pickstartTime
    }">
        </el-time-select>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
      <!--    时间表      -->
    <el-table
      :data="daytimes"
      style="width: 100%"
      height="600"
      border>
    <el-table-column
      width="180"
      prop="perhour"
      v-for="k in 7" :key="k"
      v-bind:label="showtheDate(k)"
      >
      <template slot-scope="scope">
        <div v-bind:class="{freestyle: checkfree(k-1,scope.row.perhour),busystyle:checkbook(k-1,scope.row.perhour)}">{{scope.row.perhour+":00"}}</div>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      pickDate: '',
      pickstartTime: '',
      pickendTime: '',
      formarr: [], // 时间表状态数组
      dialogVisible: false,
      pickerOptions: {
        // 设置选空闲时间日期规则，只能选今天和以后六天
        disabledDate: (time) => {
          var date1 = new Date()
          var date2 = new Date(date1.getTime() - 1 * (24 * 60 * 60 * 1000))
          var date3 = new Date(date1.getTime() + 6 * (24 * 60 * 60 * 1000))
          return time.getTime() < date2.getTime() || time.getTime() > date3.getTime()
        }
      },
      daytimes: [{
        perhour: 0
      }, {
        perhour: 1
      }, {
        perhour: 2
      }, {
        perhour: 3
      }, {
        perhour: 4
      }, {
        perhour: 5
      }, {
        perhour: 6
      }, {
        perhour: 7
      }, {
        perhour: 8
      }, {
        perhour: 9
      }, {
        perhour: 10
      }, {
        perhour: 11
      }, {
        perhour: 12
      }, {
        perhour: 13
      }, {
        perhour: 14
      }, {
        perhour: 15
      }, {
        perhour: 16
      }, {
        perhour: 17
      }, {
        perhour: 18
      }, {
        perhour: 19
      }, {
        perhour: 20
      }, {
        perhour: 21
      }, {
        perhour: 22
      }, {
        perhour: 23
      }],
      freetimes: [
        {date: new Date(2019, 11, 31),
          starttime: new Date(0, 0, 0, 8),
          endtime: new Date(0, 0, 0, 10),
          event: '',
          isfree: ''},
        {date: new Date(2020, 0, 2),
          starttime: new Date(0, 0, 0, 7),
          endtime: new Date(0, 0, 0, 20),
          event: '',
          isfree: ''},
        {date: new Date(2020, 0, 2),
          starttime: new Date(0, 0, 0, 1),
          endtime: new Date(0, 0, 0, 2),
          event: '',
          isfree: ''},
        {date: new Date(2020, 0, 3),
          starttime: new Date(0, 0, 0, 20),
          endtime: new Date(0, 0, 0, 23),
          event: '',
          isfree: ''},
        {date: new Date(2020, 0, 1),
          starttime: new Date(0, 0, 0, 20),
          endtime: new Date(0, 0, 0, 23),
          event: '',
          isfree: ''},
        {date: new Date(2020, 0, 7),
          starttime: new Date(0, 0, 0, 20),
          endtime: new Date(0, 0, 0, 23),
          event: '',
          isfree: ''},
        {date: new Date(2020, 0, 8),
          starttime: new Date(0, 0, 0, 7),
          endtime: new Date(0, 0, 0, 8),
          event: '',
          isfree: ''}
      ],
      booktimes: [
        {date: new Date(2020, 0, 2),
          starttime: new Date(0, 0, 0, 10),
          endtime: new Date(0, 0, 0, 13),
          event: '',
          is_received: true},
        {date: new Date(2020, 0, 2),
          starttime: new Date(0, 0, 0, 18),
          endtime: new Date(0, 0, 0, 19),
          event: '',
          is_received: true},
        {date: new Date(2020, 0, 7),
          starttime: new Date(0, 0, 0, 21),
          endtime: new Date(0, 0, 0, 22),
          event: '',
          is_received: true}
      ]
    }
  },
  created () {
    // 初始化表的状态矩阵
    this.initFormarr()
    // 用空闲时间数组更新状态数组
    this.changeFormarr()
    // 用预约数组更新状态数组
    this.changeFormarr2()
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    initFormarr () {
      // 初始化时间表的状态矩阵
      this.formarr = new Array(7)
      for (let i = 0; i < 7; i++) {
        this.formarr[i] = new Array(24)
        for (let j = 0; j < 24; j++) {
          this.formarr[i][j] = 0
        }
      }
    },
    changeFormarr () {
      // 用空闲时间数组更新状态数组
      var currenttime = new Date()
      for (let i = 0; i < this.freetimes.length; i++) {
        if (this.freetimes[i].date.getFullYear() === (currenttime.getFullYear() + 1)) {
          var d3 = 31 - currenttime.getDate() + this.freetimes[i].date.getDate()
          if (d3 < 7) {
            var start3 = this.freetimes[i].starttime.getHours()
            var end3 = this.freetimes[i].endtime.getHours()
            for (let j = start3; j < end3; j++) {
              this.formarr[d3][j] = 1
            }
          }
        } else if (this.freetimes[i].date.getFullYear() === currenttime.getFullYear()) {
          if (this.freetimes[i].date.getMonth() === currenttime.getMonth()) {
            var d = (this.freetimes[i].date.getDate() - currenttime.getDate())
            if (!(d < 0) && d < 7) {
              var start = this.freetimes[i].starttime.getHours()
              var end = this.freetimes[i].endtime.getHours()
              for (let j = start; j < end; j++) {
                this.formarr[d][j] = 1
              }
            }
          } else if (this.freetimes[i].date.getMonth() === (currenttime.getMonth() + 1)) {
            var m = new Date(this.freetimes[i].date.getFullYear(), this.freetimes[i].date.getMonth(), 1)
            var lastday = new Date(m.getTime() - 1)
            var d2 = lastday.getDate() - currenttime.getDate() + this.freetimes[i].date.getDate()
            if (d2 < 7) {
              var start2 = this.freetimes[i].starttime.getHours()
              var end2 = this.freetimes[i].endtime.getHours()
              for (let j = start2; j < end2; j++) {
                this.formarr[d2][j] = 1
              }
            }
          }
        }
      }
    },
    changeFormarr2 () {
      // 用预约时间数组更新状态数组
      var currenttime = new Date()
      for (let i = 0; i < this.booktimes.length; i++) {
        if (this.booktimes[i].is_received === true) {
          if (this.booktimes[i].date.getFullYear() === (currenttime.getFullYear() + 1)) {
            var d3 = 31 - currenttime.getDate() + this.booktimes[i].date.getDate()
            if (d3 < 7) {
              var start3 = this.booktimes[i].starttime.getHours()
              var end3 = this.booktimes[i].endtime.getHours()
              for (let j = start3; j < end3; j++) {
                this.formarr[d3][j] = 2
              }
            }
          } else if (this.booktimes[i].date.getFullYear() === currenttime.getFullYear()) {
            if (this.booktimes[i].date.getMonth() === currenttime.getMonth()) {
              var d = (this.booktimes[i].date.getDate() - currenttime.getDate())
              if (!(d < 0) && d < 7) {
                var start = this.booktimes[i].starttime.getHours()
                var end = this.booktimes[i].endtime.getHours()
                for (let j = start; j < end; j++) {
                  this.formarr[d][j] = 2
                }
              }
            } else if (this.booktimes[i].date.getMonth() === (currenttime.getMonth() + 1)) {
              var m = new Date(this.booktimes[i].date.getFullYear(), this.booktimes[i].date.getMonth(), 1)
              var lastday = new Date(m.getTime() - 1)
              var d2 = lastday.getDate() - currenttime.getDate() + this.booktimes[i].date.getDate()
              if (d2 < 7) {
                var start2 = this.booktimes[i].starttime.getHours()
                var end2 = this.booktimes[i].endtime.getHours()
                for (let j = start2; j < end2; j++) {
                  this.formarr[d2][j] = 2
                }
              }
            }
          }
        }
      }
    },
    showtheDate (k) {
      // 显示表头时间
      var t = new Date()
      t.setTime(t.getTime() + (k - 1) * (24 * 60 * 60 * 1000))
      var thedate = t.getDate()
      var themon = t.getMonth()
      var theday = t.getDay()
      var stringday = ''
      if (theday === 1) stringday = '星期一'
      else if (theday === 2) stringday = '星期二'
      else if (theday === 3) stringday = '星期三'
      else if (theday === 4) stringday = '星期四'
      else if (theday === 5) stringday = '星期五'
      else if (theday === 6) stringday = '星期六'
      else if (theday === 0) stringday = '星期日'
      stringday = (themon + 1) + '月' + thedate + '号' + stringday
      return stringday
    },
    checkfree (d, h) {
      if (this.formarr[d][h] === 1) return true
      else return false
    },
    checkbook (d, h) {
      if (this.formarr[d][h] === 2) return true
      else return false
    }
  }
}
</script>

<style scoped>
  .freestyle{
    background: #8EE5EE;
    width: 100%;
    height: 100%;
  }
  .busystyle{
    background: #EEDC82;
    width: 100%;
    height: 100%;
  }
  .textstyle{
    font-size: 10px;
    color: #FF0000;
  }
</style>
