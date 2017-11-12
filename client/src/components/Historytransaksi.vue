<template>
  <div class="Historytransaksi">

    <div class="" v-for="data in transaksi">
      <div class="container">
        <table class="">
          <tr>
            <th>Nama Produk</th>
            <th>Harga Produk</th>
            <th>quantity</th>
            <th>Total Harga</th>
          </tr>
          <tr v-for="dataproduk in data">
            <td>{{dataproduk.namaproduct}}</td>
            <td>{{dataproduk.harga}}</td>
            <td>{{dataproduk.quantity}}</td>
            <td>{{dataproduk.harga * dataproduk.quantity}}</td>
          </tr>
        </table>
      </div>
      <p class="transaksi">===========================================</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Historytransaksi',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'getTransaksi',
      'getToken'
    ])
  },
  computed: {
    ...mapState([
      'transaksi',
      'token'
    ])
  },
  created () {
    this.getToken()
    if (this.token === '') {
      this.$router.push('/')
      console.log('kosong')
    } else {
      this.getTransaksi()
    }
    // console.log('data', this.transaksi)
  },
  watch: {
    transaksi: function (test) {
      // this.getTransaksi()
      console.log('Perbaharui')
    },
    token: function (test) {
      console.log('perbaharuitoken')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Historytransaksi {
  color: #ffffff;
  padding-top: 30px;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    width: 30%;
}

th {
  text-align: center;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

.transaksi {
  padding-top: 10px;
}
</style>
