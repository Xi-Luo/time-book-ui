<template>
  <div style="padding:80px 200px">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="修改密码">
        <el-input style="width:70%" v-model="form.name"></el-input>
      </el-form-item>
         <el-form-item label="确认密码">
        <el-input style="width:70%" v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="margin-left:40%;" type="primary">确认修改</el-button>
  </div>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
</style>
