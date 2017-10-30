<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <button type="button" name="button" @click="Home" class="btn btn-primary glyphicon glyphicon-home"> kembali ke Home</button><br><br>
        </div>
        <div class="col-md-5">
          <Register></Register>
        </div>
        <div class="col-md-5">
          <Login></Login>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Register from '@/components/Register'
import Login from '@/components/Login'
export default {
  components: {
    Navbar,
    Register,
    Login
  },
  methods: {
    Home () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
