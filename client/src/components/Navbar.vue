<template lang="html">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#"><b class="bran-style">Warung Makanan Online</b></a>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <!--
        <form class="navbar-form navbar-right" role="search">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for...">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">Go!</button>
            </span>
          </div>
        </form>
         -->
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#" class="glyphicon glyphicon-shopping-cart" data-toggle="modal" data-target="#myModal"> Jumlah Pesanan (<b style="color:red; font-size:20px">{{barangJualan.length}} Macam</b> )</a>
          </li>
          <li>
            <a>
              <button type="button" name="button" class="btn btn-danger" @click="masukAdmin"> Admin</button>
            </a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'barangJualan'
    ])
  },
  methods: {
    masukAdmin () {
      this.$router.push('/daftar-admin')
    }
  }
}
</script>

<style lang="css">
nav.navbar.navbar-default {
  border-radius: 0px;
}
b.bran-style {
  font-family: 'Lobster', cursive;
  font-size: 29px;
}
</style>
