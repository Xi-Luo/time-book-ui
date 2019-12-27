<template>
  <div>
    <el-button round type="text" @click="dialogVisible = true">添加空闲时间</el-button>
    <!--    选择空闲时间对话框-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '23:00'
    }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
      start: '00:00',
      step: '01:00',
      end: '24:00',
      minTime: startTime
    }">
        </el-time-select>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      <!--    时间表      -->
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        label="星期一"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="星期二"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="星期三"
        width="180">
      </el-table-column>
      <el-table-column
        label="星期四"
        width="180">
      </el-table-column>
      <el-table-column
        label="星期五"
        width="180">
      </el-table-column>
      <el-table-column
        label="星期六"
        width="180">
      </el-table-column>
      <el-table-column
        label="星期日"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table .busy-time {
    background: #ffffff;
  }
</style>

<script>
export default {
  name: 'home',
  data () {
    return {
      value1: '',
      dialogVisible: false,
      startTime: '',
      endTime: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
</style>
