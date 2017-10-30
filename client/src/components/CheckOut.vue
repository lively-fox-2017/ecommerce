<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <!-- daftar makanan yang di pilih -->
          <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title">jumlah makanan</h3>
            </div>
            <div class="panel-body">
              <table class="table table-hover">
                <tr>
                  <td>Jumlah</td>
                  <td>Nama Pesanan</td>
                  <td>Harga</td>
                  <td></td>
                </tr>
                <tr v-for="(barang, index) in barangJualan">
                  <td>{{ barang.quantity }}</td>
                  <td>{{ barang.namaProduct }}</td>
                  <td>Rp.{{ barang.harga * barang.quantity }}</td>
                  <td>
                    <img :src="barang.gambar" alt="" class="ukuran-image-style">
                  </td>
                  <td>
                    <!-- <button type="button" name="button" class="btn btn-danger" @click="removeToCart(barang)"> hapus</button> -->
                  </td>
                </tr>
                <tr class="info">
                  <td colspan="2"></td>
                  <!-- <td>Rp.{{ total }}</td> -->
                  <!-- <td v-if="false">Rp.{{ total }}</td> -->
                </tr>
              </table>
            </div>
          </div>
          <!-- / daftar makanan yang di pilih -->
          <button type="button" name="button" @click="lanjutkanBelanja" class="btn btn-primary"> Kembali Belanja</button>
          <button type="button" name="button" class="btn btn-success" @click="kembaliHome"> Selesai</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import sweetalert from 'sweetalert'
import Navbar from '@/components/Navbar'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Navbar
  },
  computed: {
    ...mapState([
      'barangJualan'
    ])
  },
  methods: {
    ...mapActions([
      'getAddCart'
    ]),
    kembaliHome () {
      // sweetalert('Sedang di proses')
      this.$router.push('/')
      this.barangJualan = []
    },
    lanjutkanBelanja () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
img.ukuran-image-style {
  width: 100px;
  height: 100px;
  padding-bottom: 10px;
}
</style>
