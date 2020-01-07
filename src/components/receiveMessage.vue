<template>
  <div>
    <div>
      <el-card
        style="width:700px;margin-bottom:30px"
        class="box-card"
        v-for="(item,index) in List"
        :key="item.id"
      >
        <div>{{item.username}}向您发送了一条预约邀请，</div>
        <div style="padding-left:20px">时间：{{item.date}} {{item.startTime}}--{{item.endTime}}</div>
        <div style="padding-left:20px">内容：{{item.content}}</div>
          <el-button
            @click="dialogFormVisibleB = true"
            style="float:right; margin-left:20px"
            type="text"
          >拒绝</el-button>
          <el-button type="text" @click="acceptClick1(index)" style="float:right;">接受</el-button>
      </el-card>
      <el-dialog width="50%" title="接受回复" :visible.sync="dialogFormVisibleA">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleA = false">取 消</el-button>
          <el-button type="primary" @click="acceptClick2">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog width="50%" title="拒绝回复" :visible.sync="dialogFormVisibleB">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleB = false">取 消</el-button>
          <el-button type="primary" @click="rejectClick2">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'receiveMessage',
  data () {
    return {
      List: [],
      dialogFormVisibleA: false,
      dialogFormVisibleB: false,
      textarea: '',
      selectId: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let url = 'http://localhost:8080/v1/book/sendMe/' + this.global.id
      this.axios.get(url).then(res => {
        this.List = res.data.booksList
        console.log(this.List)
      }).catch(err => {
        console.log(err)
      })
    },
    acceptClick1 (it) {
      this.dialogFormVisibleA = true
      this.selectId = this.List[it].id
      console.log('ppppppppppiiiiiiiiii', this.selectId)
    },
    acceptClick2 () {
      this.axios.post('http://localhost:8080/v1/book/update', {
        id: this.selectId + '',
        isAccepted: '1',
        elseMessage: this.textarea
      }).then(res => {
        console.log(res.data)
        this.dialogFormVisibleA = false
      }).catch()
    },
    rejectClick2 () {
      this.axios.post('http://localhost:8080/v1/book/update', {
        id: this.selectId + '',
        isAccepted: '2',
        elseMessage: this.textarea
      }).then(res => {
        console.log(res.data)
        this.dialogFormVisibleB = false
      }).catch()
    }
  }
}
</script>

<style scoped>
</style>
