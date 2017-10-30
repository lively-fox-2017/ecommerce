<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="col-md-12">
        <MainContent></MainContent>
        <CartShop></CartShop>
      </div>
    </div>
    <FooterEcommerce></FooterEcommerce>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import MainContent from '@/components/MainContent'
import CartShop from '@/components/CartShop'
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
    CartShop,
    FooterEcommerce
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
