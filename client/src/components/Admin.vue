<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="container">
      <button type="button" name="button" class="btn btn-danger" @click="halamanLogOut"> Log Out</button>
      <h2>ADMIN</h2>
      <hr>
      <FormAdmin></FormAdmin>
      <h2>Daftar menu yang di tambah</h2>
      <hr>
      <div class="row">
        <ProductTambah v-for="product in allProduct" v-bind:maknanProduct="product" v-bind:key="product.id"></ProductTambah>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import FormAdmin from '@/components/FormAdmin'
import ProductTambah from '@/components/ProductTambah'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Navbar,
    FormAdmin,
    ProductTambah
  },
  computed: {
    ...mapState([
      'allProduct'
    ])
  },
  methods: {
    ...mapActions([
      'getProduct'
    ]),
    halamanLogOut () {
      this.$router.push('/daftar-admin')
      localStorage.removeItem('token')
    }
  },
  created () {
    this.getProduct()
  }
}
</script>

<style lang="css">
</style>
