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
        <!--        <div class="more">모두 보기</div>-->
      </header>

      <div class="thumb_user" v-for="(rel, i) in data" :key="i">
        <div class="profile_thumb">
          <img src="@/assets/imgs/thumb02.jpg" alt="프로필사진">
        </div>

        <div class="detail" style="cursor: pointer" @click="refreshPost(rel.requesterId == user.uid?rel.someoneId:rel.requesterId)">
          <div class="id">
            {{rel.requesterId == user.uid?rel.someoneUser.nickname:rel.reqUser.nickname}}
          </div>
          <div class="time" v-if="(rel.requesterId == user.uid || rel.someoneId == user.uid) && rel.status === 'ACCEPTED'">친구</div>
          <div class="time" v-if="rel.requesterId == user.uid && rel.status == 'REQUESTED'">친구요청됨</div>
          <div class="time" v-if="rel.someoneId == user.uid && rel.status == 'REQUESTED'">
            친구요청
            <button @click="updateStatus(rel, true)">수락</button>
            <button @click="updateStatus(rel, false)">거절</button>
          </div>
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
  data() {
    return {
      data: [],
      user: tokenService.fetchUser()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const result = await relationService.fetchReleation()
      this.data = result.data.data
    },
    async updateStatus(v){
      await relationService.updateRelation(v.requesterId, v.someoneId, v.status?2:3)
      this.fetchData()
    },
    async refreshPost(id){
      window.eventBus.$emit("refreshSomeUser", id)
    }
  }
}
</script>