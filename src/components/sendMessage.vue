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
            <el-table-column prop="date" label="日期" width="140px"></el-table-column>
            <el-table-column prop="time" label="时间" width="140px"></el-table-column>
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
              start: '08:30',
              step: '00:15',
               end: '18:30'}"></el-time-select>——
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
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
     <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
     </span>
    </el-dialog>
    <div style="margin-bottom:10px">历史记录</div>
    <el-card
      style="width:700px;margin-bottom:30px"
      class="box-card"
      v-for="item in List"
      :key="item.id">
      <div style="padding:0px;margin:0px">
        您向 {{item.username}}于{{item.date}}发送了一条预约邀请，
        <br />内容：
        <br />
        <div style="padding-left:20px">{{item.content}}</div>
        <br />
        <div style=" text-align: right;">{{item.isRead}}</div>
      </div>
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
      gridData: [
        {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }, {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }, {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }, {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }, {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }, {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }, {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }, {
          name: '王小虎',
          date: '2019-2-5',
          time: '20:5'
        }
      ],
      List: [
        {username: 'a', content: 'ddddddddd', date: 'aaaaaaaaaaa', isRead: '已读'},
        {},
        {}
      ]
    }
  },
  methods: {
    searchButtonClick () {
      this.dialogVisible = true
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
