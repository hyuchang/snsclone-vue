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
        <div class="sprite_more_icon" data-name="more">
          <ul class="toggle_box">
            <li><input type="submit" class="follow" value="팔로우" data-name="follow"></li>
            <li>수정</li>
            <li>삭제</li>
          </ul>
        </div>
      </header>

      <div class="img_section">
        <div class="trans_inner" @dblclick="toggleLike(item)">
          <!--          <div v-if="item.imageList.length == 1"><img src="@/assets/imgs/img_section/img01.jpg" alt="visual01"></div>-->
          <!--          <div v-else>-->
          <!--          </div>-->
          <img src="@/assets/imgs/img_section/img01.jpg" alt="visual01">
        </div>
      </div>

      <div class="bottom_icons">
        <div class="left_icons">
          <div class="heart_btn" @click="toggleLike(item)">
            <div :class="{'sprite_heart_icon_red':item.like,'sprite_heart_icon_outline':!item.like}"
                 data-name="heartbeat"></div>
          </div>
          <div class="sprite_bubble_icon"></div>
          <div class="sprite_share_icon" data-name="share"></div>
        </div>
        <!--            <div class="right_icon">-->
        <!--              <div class="sprite_bookmark_outline" data-name="bookmark"></div>-->
        <!--            </div>-->
      </div>

      <div class="likes m_text">
        좋아요
        <span id="like-count">{{ item.likeCnt }}</span>
        <span id="bookmark-count"></span>
        개
        |
        댓글 수
        <span id="like-count">{{ item.commentCnt }}</span>
        <span id="bookmark-count"></span>
        개
      </div>
      <div class="timer">1시간 전</div>
      <div class="comment_container" >
        <div class="comment" >
          <div class="comment-detail" v-for="commentInfo in item.commentList" :key="commentInfo.id">
            <div class="nick_name m_text">{{ commentInfo.userInfo.nickname }}</div>
            <div>{{ commentInfo.comment }}</div>
            <div class="small_heart">
              <div class="timer2"> 1시간전</div>
            </div>
          </div>
        </div>

      </div>


      <div class="comment_field" id="add-comment-post37">
        <input type="text" v-model="comment" placeholder="댓글달기...">
        <div class="upload_btn m_text" data-name="comment" @click="createComment(item.id)">게시</div>
      </div>
    </article>
  </div>
</template>
<script>
import postService from "@/services/postService";

export default {
  data() {
    return {
      posts: [],
      page: 1,
      comment: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const result = await postService.fetchData({page: this.page})
      if (result.data.code == 0) {
        this.posts = result.data.data
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
      if ( !this.comment ) return
      const result = await postService.createComment({id: id, comment: this.comment})
      if (result.data.code == 0) {
        await this.fetchData()
        this.comment = ''
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