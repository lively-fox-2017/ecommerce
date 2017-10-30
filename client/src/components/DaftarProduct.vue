<template lang="html">
  <div class="col-sm-6 col-md-3">
    <div class="thumbnail">
      <img v-bind:src="menuMakanan.gambar" alt="maknan">
      <div class="caption">
        <h3 class="product-font-h3">{{ menuMakanan.namaProduct }}</h3>
        <p>Rp.{{ menuMakanan.harga }}</p>
        <p><a href="#" class="btn btn-primary glyphicon glyphicon-plus  btn-sm" role="button" @click="addToCart(menuMakanan)"> Add</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['menuMakanan'],
  methods: {
    ...mapActions([
      'addToCart'
    ])
  }
}
</script>

<style lang="css">
.thumbnail {
    width: 243px;
    height: 317px;
}
</style>
