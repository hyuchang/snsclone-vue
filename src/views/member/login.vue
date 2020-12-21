<template>
  <div id="main_container">
    <div class="form_container">
      <div class="form">
        <h1 class="sprite_insta_big_logo title"></h1>
        <p class="login_user_name">
          <label for="user_name">이메일:</label>
          <input type="text" id="user_name" v-model="loginData.email">
        </p>
        <p class="login_user_password">
          <label for="user_password">비밀번호:</label>
          <input type="password" id="user_password" v-model="loginData.pwd">
        </p>
        <input type="button" id="submit_btn" value="로그인" class="submit_btn" @click="login">
      </div>
      <div class="bottom_box">
        <div>
          <span>아이디가 없으신가요?</span><router-link to="/signup">회원가입</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require('@/assets/css/login.css')
import authService from "@/services/authService"
import encryption from "@/plugins/encryption";
export default {
  data(){
    return {
      loginData:{
        email:'',
        pwd:''
      },
      cPwd :'',
      isSubmit : false,
    }
  },
  methods:{
    async login(){
      if ( this.isSubmit ) return
      this.isSubmit = true
      if (  !this.loginData.pwd ||  !this.loginData.email ){
        alert('이메일 또는 비밀번호를 입력해주세요.')
        this.isSubmit = false
        return
      }
      if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(this.loginData.email)) {
        alert('이메일을 올바른 형식으로 작성해주세요.')
        this.isSubmit = false
        return
      }

      if ( this.loginData.pwd.length < 8 ){
        alert('비밀번호는 최소 8자리이상으로 설정해주세요. ')
        this.isSubmit = false
        return
      }
      const result
          = await authService.login({email:encryption.encrypt(this.loginData.email),pwd:encryption.encrypt(this.loginData.pwd)})
      if ( result.data.code === 103) {
        alert('아이디 또는 비밀번호를 확인해주세요')
        this.isSubmit = false
        return
      } else if (result.data.code === 104){
        alert('제재된 계정입니다. 관리자에게 문의하세요.')
        this.isSubmit = false
        return
      } else if (result.data.code == 0){
        console.log(result.data.data.authToken)
        authService.token.commit(result.data.data.authToken)
      }

      this.$router.push('/')
    }
  }
}
</script>