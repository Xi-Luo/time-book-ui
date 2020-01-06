<template>
  <div style="margin-left:15% ">
    <el-input style="width:700px;margin-bottom:50px;" v-model="username" placeholder="请输入预约人的用户名"></el-input>
    <el-button @click="searchButtonClick" style="height:38px" type="primary">搜索</el-button>
    <el-dialog
      title="预约申请"
      :visible.sync="dialogVisible"
      width="75%"
      :before-close="handleClose">
      <el-container style="height: 380px;">
        <el-aside>
          <h3>{{this.username}}的空闲时间：</h3>
          <el-table :data="gridData">
            <el-table-column prop="date" label="日期" width="100px"></el-table-column>
            <el-table-column prop="starttime" label="起始时间" width="100px"></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="100px"></el-table-column>
          </el-table>
        </el-aside>
        <el-main style="margin-left: 30px">
          <h2 align="center">预约填写</h2>
          <div class="demo-input-suffix" style="margin-top: 20px">
            预约日期：
            <el-date-picker
              v-model="bookDate"
              align="right"
              type="date"
              placeholder="选择日期"></el-date-picker>
          </div>
          <div class="demo-input-suffix" style="margin-top: 10px">
            起止时间：
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '23:00',
              }"></el-time-select>——
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '23:00',
              minTime: startTime}"></el-time-select>
          </div>
          <el-input
            style="margin-top:30px"
            type="textarea"
            :rows="5"
            placeholder="请输入预约活动"
            v-model="bookContent"
            clearable></el-input>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
     <el-button type="primary" @click="bookConfirm">确 定</el-button>
     </span>
    </el-dialog>
    <div style="margin-bottom:10px">历史记录</div>
    <el-card
      style="width:700px;margin-bottom:30px"
      class="box-card"
      v-for="item in List"
      :key="item.id">
      <div>您向 {{item.username}}发送了一条预约邀请，</div>
      <div style="padding-left:20px">时间：{{item.date}} {{item.startTime}}--{{item.endTime}}</div>
        <div style="padding-left:20px">内容：{{item.content}}</div>
        <div style="padding-left:20px">状态：{{item.aStr}}</div>
        <div style="padding-left:20px">{{item.elseMessage}}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'sendMessage',
  data () {
    return {
      username: '',
      dialogVisible: false,
      startTime: '',
      endTime: '',
      bookContent: '',
      value1: '',
      bookDate: '',
      input10: '',
      gridData: [],
      List: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let url = 'http://localhost:8080/v1/book/' + this.global.id
      this.axios.get(url).then(res => {
        this.List = res.data.booksList
        console.log(this.List)
      }).catch(err => {
        console.log(err)
      })
    },
    handleClose (done) {
      done()
    },
    bookConfirm () {
      let date = this.bookDate
      let ds = date.getFullYear() + '-' + date.getMonth() + 1 + '-'
      if (date.getDate() <= 9) {
        ds = ds + '0' + date.getDate()
      } else {
        ds = ds + date.getDate()
      }
      let st = ds + ' ' + this.startTime + ':00'
      let et = ds + ' ' + this.endTime + ':00'
      ds = ds + ' ' + '00:00:00'
      let id = this.global.id + ''
      console.log(ds, st, et, id)
      this.axios.post('http://localhost:8080/v1/book/', {
        SendToName: this.username,
        Date: ds,
        StartTime: st,
        EndTime: et,
        UserId: id,
        Event: this.bookContent,
        UserName: this.global.userName
      })
      this.dialogVisible = false
    },
    searchButtonClick () {
      let url = 'http://localhost:8080/v1/time/free/' + this.username
      this.axios.get(url).then(res => {
        this.gridData = res.data.timesList
        console.log(this.gridData)
        this.dialogVisible = true
      }).catch(err => {
        console.log(err)
      })
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
}
.el-table
  .el-table--fit
  .el-table--enable-row-hover
  .el-table--enable-row-transition {
  width: 30%;
}
.block {
  float: right;
}
.el-table_1_column_1 is-leaf {
  margin-left: 50%;
}
.el-input__inner {
  float: left;
}
</style>
