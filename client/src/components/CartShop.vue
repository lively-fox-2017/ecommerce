<template lang="html">
  <div>
    <!-- Modal -->
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Daftar makanan yang anda Pilih</h4>
          </div>
          <div class="modal-body">
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
                      <button type="button" name="button" class="btn btn-danger" @click="removeToCart(barang)"> hapus</button>
                    </td>
                  </tr>
                  <tr class="info">
                    <td colspan="2"></td>
                    <td>Total : Rp.{{ total }}</td>
                    <!-- <td v-if="false">Rp.{{ total }}</td> -->
                  </tr>
                </table>
              </div>
            </div>
            <!-- / daftar makanan yang di pilih -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="keChekOut"> checkout</button>
          </div>
        </div>

      </div>
    </div>
    <!-- / modal -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'barangJualan'
    ]),
    total () {
      return this.barangJualan.reduce((prevValue, itemPrice) => {
        console.log('ini  hasil prevValue', prevValue)
        console.log('ini hasil itemPrice', itemPrice)
        return prevValue + (itemPrice.harga * itemPrice.quantity)
      }, 0)
    }
  },
  methods: {
    ...mapActions([
      'removeToCart'
    ]),
    keChekOut () {
      this.$router.push('/checkout')
    }
  },
  created () {
    localStorage.getItem('dataAnyar')
  }
}
</script>

<style lang="css">
</style>
