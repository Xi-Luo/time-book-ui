<template>
  <div style="margin-left:15% ">
    <el-input style="width:700px;margin-bottom:50px;" placeholder="请输入预约人的用户名"></el-input>
    <el-button v-popover:popover2 style="height:38px" type="primary" icon="el-icon-search">搜索</el-button>
    <el-popover ref="popover2" placement="bottom" width="1200" trigger="click">
      可预约时间：
      <el-table :data="gridData">
        <el-table-column width="200" property="name" label="姓名"></el-table-column>
        <el-table-column prop="date" label="日期" width="250"></el-table-column>
          <el-table-column prop="time" label="时间" width="250"></el-table-column>
      </el-table>
      <div style="float:left; margin-left:20%; margin-top:20px">
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        ></el-date-picker>
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
        ></el-time-select>
      </div>
      <el-input
        style="margin-top:30px"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="input10"
        clearable
      ></el-input>
      <el-button
        style="margin-top:30px ;margin-left:500px;width:300px"
        type="primary"
        icon="el-icon-search"
      >确认</el-button>
    </el-popover>
    <div style="margin-bottom:10px">历史记录</div>
    <el-card
      style="width:700px;margin-bottom:30px"
      class="box-card"
      v-for="item in List"
      :key="item.id"
    >
      <div style="padding:0px;margin:0px">
        您向 {{item.username}}于{{item.date}}发送了一条预约邀请，
        <br />内容：
        <br />
        <div style="padding-left:20px">{{item.neirong}}</div>
        <br />
        <div style=" text-align: right;">已读</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "sendMessage",
  data() {
    return {
      startTime: "",
      endTime: "",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      input10: "",
      gridData: [
        {
          name: "王小虎",
          date:"2019-2-5",
          time:"20:5"
        },
      ],
      List: [
        { username: "a", neirong: "dwndeuondiowenjqoi", date: "2019-10-12" },
        { username: "a", neirong: "cewncinweocnwoenc", date: "" },
        { username: "a", neirong: "dwndeuondiowenjqoi", date: "2019-10-12" },
        { username: "a", neirong: "cewncinweocnwoenc", date: "" }
      ]
    };
  }
};
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
