<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="col-md-3">
        <Sidebar></Sidebar>
      </div>
      <div class="col-md-9">
        <MainContent></MainContent>
      </div>
    </div>
    <FooterEcommerce></FooterEcommerce>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import MainContent from '@/components/MainContent'
import Sidebar from '@/components/Sidebar'
import FooterEcommerce from '@/components/FooterEcommerce'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Navbar,
    MainContent,
    Sidebar,
    FooterEcommerce
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
