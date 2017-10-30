<template lang="html">
  <div>
    <!-- carausel -->
    <div class="row">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
          <div class="item active slider-image">
            <img src="../assets/slider/slider_1.jpg" alt="makanan" style="width:100%">
            <div class="carousel-caption">
              <h2 class="kata-style-slider">Pilihan menu Yang favorite</h2>
            </div>
          </div>
          <div class="item slider-image">
            <img src="../assets/slider/slider_2.jpg" alt="makanan" style="width:100%">
            <div class="carousel-caption">
              <h2  class="kata-style-slider">Dengan Ankea makana khas..</h2>
            </div>
          </div>
          ...
        </div>

        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    <!-- / carausel  -->

    <div class="text-center">
      <h2  class="kata-style">Daftar makan Daerah</h2>
    </div>
    <div class="row">
      <!-- product -->
      <DaftarProduct  v-for="makanan in allProduct"  v-bind:menuMakanan="makanan" v-bind:key="makanan.id"></DaftarProduct>
      <!-- / product -->
    </div>
  </div>
</template>

<script>
import DaftarProduct from '@/components/DaftarProduct'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    DaftarProduct
  },
  computed: {
    ...mapState([
      'allProduct'
    ])
  },
  methods: {
    ...mapActions([
      'getProduct'
    ])
  },
  created () {
    this.getProduct()
  }
}
</script>

<style lang="css">
.kata-style-slider{
  color: white;
  font-weight: bold;
  font-family: 'Abril Fatface', cursive;
}
.kata-style{
  color: black;
  font-family: 'Abril Fatface', cursive;
  border-bottom: 2px solid black;
}
.slider-image{
  height: 400px;
}
.product-font-h3{
  font-family: 'Playfair Display SC', serif;
}
</style>
