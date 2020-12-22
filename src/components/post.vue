<template>
  <div>
    <article class="contents" v-for="item in posts" :key="item.id">
      <header class="top">
        <div class="user_container">
          <div class="profile_img">
            <img src="@/assets/imgs/thumb.jpeg" alt="프로필이미지">
          </div>
          <div class="user_name">
            <div class="nick_name m_text">{{ item.userInfo.nickname }}</div>
            <div class="country s_text">{{ item.userInfo.email }}</div>
          </div>
        </div>
<!--        <div class="sprite_more_icon" data-name="more">-->
<!--          <ul class="toggle_box">-->
<!--            <li><input type="submit" class="follow" value="팔로우" data-name="follow"></li>-->
<!--            <li>수정</li>-->
<!--            <li>삭제</li>-->
<!--          </ul>-->
<!--        </div>-->
      </header>

      <div class="img_section">
        <div class="trans_inner" @dblclick="toggleLike(item)">
          <div v-if="item.imageList.length>0">
            <img :src="item.imageList[0].path" alt="image" onerror="this.src='https://previews.123rf.com/images/roxanabalint/roxanabalint1308/roxanabalint130800213/21703166-%EC%98%88-%EA%B7%B8%EB%9F%B0-%EC%A7%80-%EA%B3%A0%EB%AC%B4-%EC%8A%A4%ED%83%AC%ED%94%84-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg'">
          </div>
          <div v-else>
            <img src="@/assets/imgs/img_section/img01.jpg" alt="image" >
          </div>

        </div>
      </div>

      <div class="bottom_icons">
        <div class="left_icons">
          <div class="heart_btn" @click="toggleLike(item)">
            <div :class="{'sprite_heart_icon_red':item.like,'sprite_heart_icon_outline':!item.like}"
                 data-name="heartbeat"></div>
          </div>
          <div class="sprite_bubble_icon"></div>
<!--          <div class="sprite_share_icon" data-name="share"></div>-->
        </div>
        <!--            <div class="right_icon">-->
        <!--              <div class="sprite_bookmark_outline" data-name="bookmark"></div>-->
        <!--            </div>-->
      </div>

      <div class="likes m_text">
        <span>
        좋아요
        <span id="like-count">{{ item.likeCnt }}</span>
        <span id="bookmark-count"></span>
        개
        </span>
        <span>
        댓글 수
        <span id="like-count">{{ item.commentCnt }}</span>
        <span id="bookmark-count"></span>
        개
        </span>
      </div>

      <div class="comment_container">
        <div class="comment" v-text="item.description" style="white-space: pre;">
        </div>
      </div>


      <div class="timer">{{moment(new Date()).startOf('hour').fromNow()}}</div>
      <div class="comment_container">
        <div class="comment">
          <div class="comment-detail" v-for="commentInfo in item.commentList" :key="commentInfo.id">
            <div class="nick_name m_text">{{ commentInfo.userInfo.nickname }}</div>
            <div>{{ commentInfo.comment }}</div>
            <div class="small_heart">
              <div class="timer2">{{moment(commentInfo.createAt).fromNow()}}</div>
            </div>
          </div>
        </div>
      </div>


      <div class="comment_field" id="add-comment-post37">
        <input type="text" placeholder="댓글달기..." maxlength="100" :ref="'comment_'+item.id">
        <div class="upload_btn m_text" data-name="comment" @click="createComment(item.id)">게시</div>
      </div>
    </article>
  </div>
</template>
<script>
import postService from "@/services/postService";
import {tokenService} from "@/services/authService";
import moment from 'moment'
export default {
  data() {
    return {
      posts: [],
      page: 1,
      user: tokenService.fetchUser(),
      moment : moment
    }
  },
  mounted() {
    moment.locale('ko');
    this.fetchData()
    window.eventBus.$on('refreshSomeUser', this.fetchSomeOneData)
  },
  watch:{
    comment(v){
      if(v.length > 120){
        return v.substr(0, 120)
      }
    }
  },
  methods: {
    async fetchData() {
      const result = await postService.fetchData({page: this.page})
      if (result.data.code == 0) {
        this.posts = result.data.data
        this.posts.forEach(x => {
          x['like'] = x.likeList.filter(y => y.userId == this.user.uid).length > 0
        })
      }
    },
    async fetchSomeOneData(someId) {
      const result = await postService.fetchBySomeData({someId: someId,page: this.page})
      if (result.data.code == 0) {
        this.posts = result.data.data
        this.posts.forEach(x => {
          x['like'] = x.likeList.filter(y => y.userId == this.user.uid).length > 0
        })
      }
    },
    async toggleLike(item) {
      let result
      const param = {id: item.id}
      if (item.like) {
        result = await postService.unlike(param)
        item.likeCnt--
      } else {
        result = await postService.like(param)
        item.likeCnt++
      }
      if (result.data.code == 0) {
        item.like = !item.like
      }
    },
    async createComment(id) {
      if (!this.$refs[`comment_${id}`][0].value) return
      const result = await postService.createComment({id: id, comment: this.$refs[`comment_${id}`][0].value})
      if (result.data.code == 0) {
        await this.fetchData()
        this.$refs[`comment_${id}`][0].value = ''
      }
    },
    async deleteComment(id) {
      const result = await postService.deleteComment(id)
      if (result.data.code == 0) {
        this.fetchData()
      }
    }
  }
}
</script>