<template>
  <div class="Isikonten">
    <hr>
    <div class="" >
      <div class="" v-if="formulir==false">

      </div>
      <div class="Pembatas" v-else>
        <div class="col-sm-4">

          <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title">Perhatian</h3>
            </div>
            <div class="panel-body">
              <p>Silahkan input product baru pada filed yang telah disediakan.</p>
            </div>
          </div>

        </div>
        <div class="col-sm-8 pembatascol">
          <form @submit.prevent="inputbarang({namaproduct, deskripsi})" class="">
            <input v-model="namaproduct" type="text" class="form-control" id="pwd" placeholder="Input nama product">
            <textarea v-model="deskripsi" class="form-control" rows="5" id="comment" placeholder="Input deskripsi product"></textarea>
            <input v-model="linkimage" type="link" class="form-control" id="pwd" placeholder="Input link gambar product">
            <input v-model="harga" type="number" class="form-control" id="pwd">
            <button type="submit" class="">Input Produk Baru</button>
          </form>
        </div>
      </div>
    </div>

    <div class="" v-for="databarang in semuaProduk">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <div class="thumbnail" >
          <img :src="databarang.linkimage" class="img-responsive">
          <div class="caption">
            <div class="row">

              <div class="juduldeskripsi">
                <p><b>{{databarang.namaproduct}}</b></p>
                <p>{{databarang.deskripsi}}</p>
              </div>

              <div class="col-md-4 col-sm-4 col-xs-4 price">
                <h5><b>{{databarang.harga}}</b></h5>
              </div>

              <div class="col-md-8 col-sm-8 col-xs-8">
                <!--Perhatikan-->
                <a v-on:click="beli(databarang)" class="btn btn-success btn-product"><span class="glyphicon glyphicon-shopping-cart"></span> Add 2 Cart</a>
              </div>

            </div>
          </div>
				</div>
			</div>
    </div>
    <!-- <p style="color:#ffffff" v-for="transaksi in transaksi">{{transaksi.produk[0].jumlahitem}} {{transaksi.produk[0].idproduct}}====================== </p> -->
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Isikonten',
  data () {
    return {
      data: [],
      namaproduct: '',
      deskripsi: '',
      linkimage: '',
      harga: 0
    }
  },
  methods: {
    beli (data) {
      this.$store.dispatch('getCart', {
        data
      })
    },
    inputbarang () {
      this.$store.dispatch('addProduct', {
        namaproduct: this.namaproduct,
        deskripsi: this.deskripsi,
        linkimage: this.linkimage,
        harga: Number(this.harga)
      })
      this.namaproduct = ''
      this.deskripsi = ''
      this.linkimage = ''
      this.harga = 0
      this.getFormulir()
    },
    ...mapActions([
      'getProductAll',
      'addProduct',
      'getTransaksi'
    ])
  },
  computed: {
    ...mapState([
      'semuaProduk',
      'semuaCart',
      'formulir',
      'produkbaru',
      'transaksi',
      'sementara',
      'getFormulir'
    ])
  },
  created () {
    this.getProductAll()
    this.getTransaksi()
  },
  watch: {
    semuaCart: function (apalah) {
      this.data = this.semuaCart
    },
    produkbaru: function (apalah) {
      this.getProductAll()
      // console.log('ini dari watch product baru')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-product{
    width: 100%;
}
.juduldeskripsi {
  height: 100px;
  overflow-y: auto;
}
.form-control {
  margin-bottom: 10px;
}
.pembatascol {
  padding-bottom: 15px;
}
</style>
