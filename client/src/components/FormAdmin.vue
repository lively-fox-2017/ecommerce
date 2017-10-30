<template lang="html">
  <form @submit.prevent="submitProduct(formProduct)">
    <div class="form-group">
      <label class="control-label" for="focusedInput"> Image URL</label>
      <input class="form-control" v-model="formProduct.gambar" type="text" placeholder="image url...">
    </div>
    <div class="form-group">
      <label class="control-label" for="focusedInput"> Nama menu Makanan</label>
      <input class="form-control" v-model="formProduct.namaProduct" type="text" placeholder="namaProduct">
    </div>
    <div class="form-group">
      <label class="control-label" for="focusedInput"> Harga</label>
      <input class="form-control" v-model="formProduct.harga" type="text" placeholder=" Harga...">
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary glyphicon glyphicon-plus"> add</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formProduct: {
        gambar: '',
        harga: 0,
        namaProduct: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'submitProduct'
    ])
  }
}
</script>

<style lang="css">
</style>
