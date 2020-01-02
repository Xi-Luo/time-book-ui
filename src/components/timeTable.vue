<template>
  <div>
    <!--    选择空闲时间对话框-->
    <el-button round type="text" @click="dialogVisible = true">添加空闲时间</el-button>
    <el-dialog
      title="添加空闲时间"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="pickform">
      <el-date-picker
        v-model="pickform.pickDate"
        type="date"
        placeholder="选择最近七天"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-time-select
        placeholder="起始时间"
        style="margin-top: 10px"
        v-model="pickform.pickstartTime"
        :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '23:00'}">
      </el-time-select>
      <el-time-select
        style="margin-top: 10px"
        placeholder="结束时间"
        v-model="pickform.pickendTime"
        :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '24:00',
        minTime: pickform.pickstartTime}">
      </el-time-select>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
    </el-dialog>
    <!--    时间表      -->
    <el-table
      :data="daytimes"
      style="width: 100%"
      height="600"
      border>
      <el-table-column
        width="150"
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
  name: 'timeTable',
  data () {
    return {
      pickform: {
        pickDate: '',
        pickstartTime: '',
        pickendTime: ''
      },
      formarr: [], // 时间表状态数组
      dialogVisible: false,
      pickerOptions: {
        // 设置选空闲时间日期规则，只能选今天和以后六天
        disabledDate: (time) => {
          var date1 = new Date()
          var date2 = new Date(date1.getTime() - (24 * 60 * 60 * 1000))
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
      timelist: [
        {date: '2020-01-03',
          starttime: '12:00:00',
          endtime: '15:00:00',
          event: '',
          isfree: true},
        {date: '2020-01-02',
          starttime: '06:00:00',
          endtime: '09:00:00',
          event: '',
          isfree: true},
        {date: '2020-01-03',
          starttime: '22:00:00',
          endtime: '23:00:00',
          event: '',
          isfree: false},
        {date: '2020-01-06',
          starttime: '04:00:00',
          endtime: '16:00:00',
          event: '',
          isfree: false},
        {date: '2020-01-09',
          starttime: '08:00:00',
          endtime: '10:00:00',
          event: '',
          isfree: true},
        {date: '2020-01-01',
          starttime: '07:00:00',
          endtime: '12:00:00',
          event: '',
          isfree: true}
      ]
    }
  },
  created () {
    // 初始化表的状态矩阵
    this.initFormarr()
    // 用时间数组更新状态数组
    this.changeFormarr()
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
    onSubmit () {
      // 空闲时间选择表单提交
      // 弹出框隐藏
      this.dialogVisible = false
      console.log('submit!')
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
      for (let i = 0; i < this.timelist.length; i++) {
        var date = new Date(this.timelist[i].date)
        var tempstarttime = new Date('2020-01-01 ' + this.timelist[i].starttime)
        var tempendtime = new Date('2020-01-01 ' + this.timelist[i].endtime)
        if (date.getFullYear() === (currenttime.getFullYear() + 1)) {
          var d3 = 31 - currenttime.getDate() + date.getDate()
          if (d3 < 7) {
            var start3 = tempstarttime.getHours()
            var end3 = tempendtime.getHours()
            for (let j = start3; j < end3; j++) {
              if (this.timelist[i].isfree === true) this.formarr[d3][j] = 1
              else this.formarr[d3][j] = 2
            }
          }
        } else if (date.getFullYear() === currenttime.getFullYear()) {
          if (date.getMonth() === currenttime.getMonth()) {
            var d = (date.getDate() - currenttime.getDate())
            if (!(d < 0) && d < 7) {
              var start = tempstarttime.getHours()
              var end = tempendtime.getHours()
              for (let j = start; j < end; j++) {
                if (this.timelist[i].isfree === true) this.formarr[d][j] = 1
                else this.formarr[d][j] = 2
              }
            }
          } else if (date.getMonth() === (currenttime.getMonth() + 1)) {
            var m = new Date(date.getFullYear(), date.getMonth(), 1)
            var lastday = new Date(m.getTime() - 1)
            var d2 = lastday.getDate() - currenttime.getDate() + date.getDate()
            if (d2 < 7) {
              var start2 = tempstarttime.getHours()
              var end2 = tempendtime.getHours()
              for (let j = start2; j < end2; j++) {
                if (this.timelist[i].isfree === true) this.formarr[d2][j] = 1
                else this.formarr[d2][j] = 2
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
