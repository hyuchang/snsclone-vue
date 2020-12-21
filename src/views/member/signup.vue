<template>
  <div id="main_container">
    <div class="form_container">
      <div class="form">
        <h1 class="sprite_insta_big_logo title"></h1>
        <p class="login_user_name">
          <label for="user_name">이메일:</label>
          <input type="text" id="user_name" v-model="email">
        </p>
        <p class="login_user_password">
          <label for="user_password">비밀번호:</label>
          <input type="password" id="user_password" v-model="pwd">
        </p>

        <p class="login_user_password">
          <label for="user_password">비밀번호확인:</label>
          <input type="password" id="user_password1" v-model="cPwd">
        </p>
        <input type="button" id="submit_btn" value="회원가입" class="submit_btn" @click="signup">
      </div>
    </div>
  </div>
</template>
<script>
import authService from "@/services/authService";
import encryption from "@/plugins/encryption";

require('@/assets/css/login.css')
export default {
  data() {
    return {
      email: '',
      pwd: '',
      cPwd: '',
      isSubmit: false,
    }
  },
  methods: {
    async signup() {
      if (this.isSubmit) return
      this.isSubmit = true
      if (!this.pwd || !this.email) {
        alert('이메일 또는 비밀번호를 입력해주세요.')
        this.isSubmit = false
        return
      }
      if (!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(this.email)) {
        alert('이메일을 올바른 형식으로 작성해주세요.')
        this.isSubmit = false
        return
      }
      if (this.pwd.length < 8) {
        alert('비밀번호는 최소 8자리이상으로 설정해주세요. ')
        this.isSubmit = false
        return
      }
      if (this.pwd != this.cPwd) {
        alert('비밀번호가 서로 맞지 않습니다. ')
        this.isSubmit = false
        return
      }
      const result
          = await authService.signup({email: encryption.encrypt(this.email), pwd: encryption.encrypt(this.pwd)})

      if (result.data.code === 101) {
        alert('이메일이 이미 사용중입니다. 다른이메일을 사용해주세요')
        this.isSubmit = false
        return
      } else if (result.data.code === 0) {
        alert('회원가입이 완료되었습니다. 로그인페이지로 이동합니다.')
      }

      this.isSubmit = false
      this.$router.push('/login')
    }
  }
}
</script>