<template>
  <div style="padding:80px 200px">
    <el-form ref="form" label-width="80px">
      <el-form-item label="旧密码">
        <el-input style="width:70%" v-model="oldPass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input style="width:70%" v-model="newPass" type="password"></el-input>
      </el-form-item>
         <el-form-item label="确认密码">
        <el-input style="width:70%" v-model="checkPass" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="onSubmit" style="margin-left:40%;" type="primary">确认修改</el-button>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      oldPass: '',
      newPass: '',
      checkPass: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.newPass !== this.checkPass) {
        this.$message.error('确认密码错误')
      } else {
        console.log(this.newPass, this.oldPass)
        this.axios.post('http://localhost:8080/v1/user/account', {
          Id: this.global.id + '',
          oldPass: this.oldPass,
          newPass: this.newPass
        }).then(res => {
          if (res.data === 'No') {
            this.$message.error('旧密码错误')
          } else {
            this.$message.success('修改成功，清重新登录')
            this.$router.push({
              path: '/'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
