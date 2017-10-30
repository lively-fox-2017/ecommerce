<template lang="html">
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <button type="button" name="button" @click="lanjutkanBelanja" class="btn btn-danger glyphicon glyphicon-shopping-cart"> Lanjutkan Belanja</button> <br><br>
          <form  @submit.prevent="masukanUser(userCart)">
            <div class="form-group">
              <label class="control-label" for="focusedInput">Nama lengkap</label>
              <input class="form-control" id="focusedInput" type="text" placeholder="Nama lengkap..." v-model="userCart.nama">
            </div>
            <div class="form-group">
              <label class="control-label" for="focusedInput">Alamat</label>
              <input class="form-control" id="focusedInput" type="text" placeholder="Alamat..." v-model="userCart.alamat">
            </div>
            <div class="form-group">
              <label class="control-label" for="focusedInput">jenis kelamin</label>
              <input class="form-control" id="focusedInput" type="text" placeholder="Jenis kelamin" v-model="userCart.jenisKelamin">
            </div>
            <div class="form-group">
              <label class="control-label" for="focusedInput">Nomor Telepon</label>
              <input class="form-control" id="focusedInput" type="text" placeholder="Nomor Telepon..." v-model="userCart.nomor">
            </div>
            <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#myModal2"> Cek daftar yang di pilih</button><br><br>
          </form>

          <!-- Modal -->
          <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
                <div class="modal-body" v-for="user in tampungUser">
                  <p>Nama : {{ user.nama }}</p>
                  <p>Alamat : {{ user.alamat }}</p>
                  <p>Jenis Kelamin : {{ user.jenisKelamin }}</p>
                  <p>Nomor : {{ user.nomor }}</p>
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
                </div>
                <div class="modal-footer">
                  <button type="button" name="button" class="btn btn-success" @click="selesaiPembelian"  data-dismiss="modal"> Selesai</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /modal -->
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
  data () {
    return {
      tampungUser: [],
      userCart: {
        nama: '',
        alamat: '',
        jenisKelamin: '',
        nomor: ''
      }
    }
  },
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
      'getAddCart',
      'selesaiPembelian'
    ]),
    lanjutkanBelanja () {
      this.$router.push('/')
    },
    masukanUser (userCart) {
      console.log('masuk ke sini ya--->', userCart)
      this.tampungUser.push(userCart)
      // this.tampungUser = []
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
