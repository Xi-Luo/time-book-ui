<template>
  <div>
    <div>
      <el-card
        style="width:700px;margin-bottom:30px"
        class="box-card"
        v-for="item in List"
        :key="item.id"
      >
        <div style="padding:0px;margin:0px">
          {{item.username}}向您于{{item.date}}发送了一条预约邀请，
          <br />内容：
          <br />
          <div style="padding-left:20px">{{item.neirong}}</div>
          <br />
          <el-button
            @click="dialogFormVisible = true"
            style="float:right; margin-left:20px"
            type="text"
          >拒绝</el-button>
          <el-dialog width="50%" title="回复对方" :visible.sync="dialogFormVisible">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>

          <el-button type="text" @click="dialogFormVisible = true" style="float:right;">确认</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "receiveMessage",
  data() {
    return {
      List: [
        { username: "a", neirong: "dwndeuondiowenjqoi", date: "2019-10-12" },
        { username: "a", neirong: "cewncinweocnwoenc", date: "" },
        { username: "a", neirong: "dwndeuondiowenjqoi", date: "2019-10-12" },
        { username: "a", neirong: "cewncinweocnwoenc", date: "" }
      ],
      dialogFormVisible: false,
      textarea: "",
    };
  }
};
</script>

<style scoped>
</style>
