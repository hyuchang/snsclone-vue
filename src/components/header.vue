<template>
  <div>
    <header id="header">
      <section class="h_inner">

        <h1 class="logo">
          <router-link to="/">
            <div class="sprite_insta_icon"></div>
            <div>
              <div class="sprite_write_logo"></div>
            </div>
          </router-link>
        </h1>

        <div class="search_field">
          <input type="text" placeholder="검색" tabindex="0">

          <div class="fake_field">
            <span class=sprite_small_search_icon></span>
            <span>검색</span>
          </div>
        </div>


        <div class="right_icons">
          <router-link to="new_post.html">
            <div class="sprite_camera_icon"></div>
          </router-link>
          <router-link to="login.html">
            <div class="sprite_compass_icon"></div>
          </router-link>
          <router-link to="follow.html">
            <div class="sprite_heart_icon_outline"></div>
          </router-link>
          <router-link to="profile.html">
            <div class="sprite_user_icon_outline"></div>
          </router-link>
        </div>
      </section>
    </header>
  </div>
</template>
<script>
export default {
  name: 'snsHeader'
}
</script>