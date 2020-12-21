<template>
  <section id="main_container">
    <div class="inner">
      <div class="contents_box">
        <post></post>
      </div>
      <sidebar></sidebar>
    </div>
  </section>
</template>
<script>
import sidebar from "@/components/sidebar"
import post from '@/components/post'

export default {
  data() {
    return {

    }
  },
  components: {
    sidebar,
    post
  }
}
</script>