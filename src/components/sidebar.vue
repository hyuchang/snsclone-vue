<template>
  <div class="side_box">
    <div class="user_profile">
      <div class="profile_thumb">
        <img src="@/assets/imgs/thumb.jpeg" alt="프로필사진">
      </div>
      <div class="detail">
        <div class="id m_text">{{ user.nickname }}</div>
      </div>
    </div>
    <article class="recommend">
      <header class="reco_header">
        <div>회원님의 친구</div>
        <div class="more">모두 보기</div>
      </header>

      <div class="thumb_user">
        <div class="profile_thumb">
          <img src="@/assets/imgs/thumb02.jpg" alt="프로필사진">
        </div>
        <div class="detail">
          <div class="id">kind_tigerrrr</div>
          <div class="time">친구</div>
        </div>
      </div>
      <div class="thumb_user">
        <div class="profile_thumb">
          <img src="@/assets/imgs/thumb02.jpg" alt="프로필사진">
        </div>
        <div class="detail">
          <div class="id">kind_tigerrrr</div>
          <div class="time">수락|거절</div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import relationService from '@/services/relationService'
import {tokenService} from '@/services/authService'
export default {
  name: "side-bar",
  data(){
    return {
      data : [],
      user : tokenService.fetchUser()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods:{
    fetchData(){
      const result = relationService.fetchReleation()
      this.data = result.data.data

    }
  }
}
</script>