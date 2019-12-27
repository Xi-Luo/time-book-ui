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
          <el-button v-popover:popover2 style="float:right; margin-left:20px" type="text">拒绝</el-button>
          <el-popover
            ref="popover2"
            placement="bottom"
            title="标题"
            width="200"
            trigger="click"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          ></el-popover>
          <el-button type="text" style="float:right;">确认</el-button>
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
      ]
    };
  }
};
</script>

<style scoped>
</style>
