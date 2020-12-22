<template>
  <div id="main_container">
    <div class="post_form_container">
      <form action="#" class="post_form">
        <div class="title">
          NEW POST
        </div>
        <div class="preview">
          <div class="upload">
            <div class="post_btn">
              <p>아래 버튼을 통해 포스트 이미지 추가</p>
              <p><img v-show="imageUrl" id="img_id" :src="imageUrl" style="width: 300px; height: 300px; object-fit: cover" alt="thumbnail"></p>
            </div>
          </div>
        </div>
        <p>
          <input type="file" ref="imageFiles1" @change="onchangeImage" accept="image/*">
          <input type="file" ref="imageFiles2" @change="onchangeImage" accept="image/*">
          <input type="file" ref="imageFiles3" @change="onchangeImage" accept="image/*">
          <input type="file" ref="imageFiles4" @change="onchangeImage" accept="image/*">
          <input type="file" ref="imageFiles5" @change="onchangeImage" accept="image/*">
        </p>
        <p>
          <textarea name="content" v-model="content" id="text_field" cols="50" rows="5" maxlength="200" placeholder="200자 까지 등록 가능합니다."></textarea>
        </p>
        <p>
          <strong>게시물 공개</strong><br><br>
          <input type="radio" v-model="acl" value="PUBLIC">전체 공개
          <input type="radio" v-model="acl" value="PRIVATE">친구 공개
        </p>

        <input class="submit_btn" type="button" value="저장" @click="create">
      </form>
    </div>
  </div>
</template>
<script>
import postService from "@/services/postService";

require('@/assets/css/new_post.css')
export default {
  data(){
    return {
      content:'',
      imageUrl:'',
      isSubmit:false,
      imageCount:5,
      acl:'PUBLIC'
    }
  },
  mounted() {
    window['test'] = this
  },
  methods: {
    onchangeImage(e) {
      const file = e.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
    },
    async create(){
      if ( this.isSubmit) return
      if (!this.content){
        alert('내용을 입력해주세요')
        this.isSubmit = false
        return
      }
      this.isSubmit = true
      const formData = new FormData();
      formData.append("description", this.content)
      formData.append("acl", this.acl)
      for (let i = 1; i <= this.imageCount; i++){
        if (this.$refs[`imageFiles${i}`].files.length > 0){
          formData.append("images", this.$refs[`imageFiles${i}`].files[0])
        }
      }
      try{
        const result = await postService.createPost(formData)
        if ( result.data.code == 0 ) {
          alert('등록이 완료되었습니다')
          this.$router.push('/')
        } else {
          alert('등록에 실패하였습니다. 잠시 후 다시 시도해주세요')
        }
      }catch (e){
        alert('오류가 발생하였습니다 잠시 후 다시 시도해주세요 ')
        this.isSubmit = false
      }


    }
  }
}
</script>