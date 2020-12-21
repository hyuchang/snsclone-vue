<template>
  <div id="app">
    <section id="container">
      <sns-header />
      <router-view/>
    </section>
  </div>

</template>

<script>
require('@/assets/css/reset.css')
require('@/assets/css/common.css')
require('@/assets/css/style.css')
import snsHeader from '@/components/header'
export default {
  components: {
    snsHeader
  }
}
</script>


