<template>
  <div style="width: 30%;margin-left: 35%;margin-top: 10%" >
    <el-form ref="AccountForm" :model="account" :rules="rules" label-position="left" label-width="0px">
      <h3 class="title" style="margin-left: 35%">欢迎登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="account.username"
          auto-complete="off"
          placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="account.pwd" :autofocus="pwdFocus" auto-complete="off" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item class="extra-text">
        <router-link :to="{path: '/register'}" class="reg-text" title="立即注册">立即注册</router-link>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :disabled="allowLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'login',
  data () {
    var validateAccount = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        if (this.account.username !== '') {
          this.account.username = value
          this.validateCorrect()
        }
        callback()
      }
    }
    var validatePwd = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.account.pwd !== '') {
          this.account.pwd = value
          this.validateCorrect()
        }
        callback()
      }
    }
    return {
      loading: false,
      Id: '',
      account: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [
          { required: true, validator: validateAccount, trigger: 'change' }
        ],
        pwd: [
          {required: true, validator: validatePwd, trigger: 'change'}
        ]
      },
      pwdFocus: false,
      allowLogin: true,
      checked: true
    }
  },
  created () {
    let regUser = JSON.parse(window.localStorage.getItem('register-user'))
    if (regUser) {
      this.account.username = regUser.username
      this.account.pwd = ''
      this.pwdFocus = true
    }
  },
  methods: {
    handleLogin () {
      // let that = this

      this.axios.post('http://localhost:8080/v1/user/login', {
        UserName: this.account.username,
        Password: this.account.pwd}).then(res => {
        if (res.data != null) {
          this.Id = res.data
          console.log('loginid', this.Id)
          this.global.id = this.Id
          this.global.userName = this.account.username
          console.log('global', this.global.id)
          this.$message.success('登录成功！')
          this.$router.push({
            path: '/timet',
            query: {
              userId: this.Id
            }
          })
        }
      }).catch()

      // let result = {
      //   id: '1',
      //   username: 'admin',
      //   nickname: this.account.username,
      //   name: 'administrator',
      //   email: '888888@163.com'
      // }
      // this.loading = true
      // let status = API.login(result)
      // if (status === 'success') {
      //   localStorage.setItem('access-user', JSON.stringify(result))
      //   window.localStorage.removeItem('register-user')
      //   that.$router.push({path: '/'})
      // } else {
      //   this.loading = false
      //   this.$message.error('登录失败，账号或密码错误')
      // }
    },
    validateCorrect () {
      if (this.account.pwd.trim().length > 0 && this.account.username.trim().length > 0) {
        this.allowLogin = false
      } else {
        this.allowLogin = true
      }
    }
  }
}
</script>

<style scoped>

</style>
