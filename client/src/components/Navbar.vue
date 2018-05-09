<template>
  <div class="Navbar">
    <nav class="navbar navbar-default">

      <!-- <nav class="navbar navbar-default navbar-fixed-top"> -->
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" @click="home" href="#">E-Commerce Hacktiv</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <!-- ini harus dirubah -->
            <li v-if="role == 'Admin'"><a @click="perubahan()" href="#">Input Barang</a></li>
            <li v-else><a href="">Login Sebelum Input</a></li>
            <li><a @click="pindah" href="#">Category two</a></li>
          </ul>

          <!--Login Bar-->
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>User</b> <span class="caret"></span></a>
              <ul id="login-dp" class="dropdown-menu">
                <li>
                  <div class="row">

                    <div class="col-md-12" v-if="!token">

                      <form @submit.prevent="masuk({ username, password})" class="form" action="index.html" method="post"  accept-charset="UTF-8" id="login-nav">
                        <div class="form-group">
                          <label class="sr-only" for="exampleInputEmail2">Email address</label>
                          <input v-model="username" type="text" class="form-control" id="exampleInputEmail2" placeholder="Username" required>
                        </div>

                        <div class="form-group">
                          <label class="sr-only" for="exampleInputPassword2">Password</label>
                          <input v-model="password" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required>
                        </div>

                        <div class="form-group">
                          <button type="submit" class="btn btn-primary btn-block">Sign in</button>
                        </div>

                      </form>
                    </div>

                    <div class="col-md-12" v-else>
                      <form @submit.prevent="logout()" class="form" action="index.html" method="post"  accept-charset="UTF-8" id="login-nav">
                      <div class="form-group">
                        <p>Halooo, <b>{{dataPengguna.username}}</b> Selamat Berbelanja</p>
                        <button type="submit" class="btn btn-primary btn-block">Sign Out</button>
                      </div>
                      </form>
                    </div>

                  </div>
                </li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span class="glyphicon glyphicon-shopping-cart"></span> {{semuaCart.length}} - Items<span class="caret"></span></a>
              <ul class="dropdown-menu dropdown-cart" role="menu">
                  <li v-for="data in semuaCart">
                      <span class="item">
                        <span class="item-left">
                            <img class="image" :src="data.linkimage" alt="" />
                            <span class="item-info">
                                <span>{{data.namaproduct}}</span>
                                <span>{{data.harga * data.jumlah}}</span>
                                <p>{{data.jumlah}}</p>
                            </span>
                        </span>
                    </span>
                  </li>

                  <li class="divider"></li>
                  <li><a class="text-center" href=""><b>{{totalCart}}</b></a></li>
                  <li class="divider"></li>
                  <li><a @click.prevent="beli()" class="text-center" href="">Beli Barang</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Konten',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState([
      'token',
      'semuaCart',
      'totalCart',
      'dataPengguna',
      'role',
      'formulir'
    ])
  },
  methods: {
    pindah () {
      if (this.token === '') {
        // console.log('silahkan login dulu')
      } else {
        this.$router.push({ path: 'Historytransaksi' })
      }
    },
    home () {
      this.$router.push('/')
    },
    masuk () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
      .then((data) => {
        this.getToken()
      })
    },
    logout: function () {
      localStorage.removeItem('token')
      this.getToken()
      this.perubahan()
      // this.getDataUser()
    },
    perubahan: function () {
      // this.formulir = !this.formulir
      this.$router.push('/')
      this.getFormulir()
      // console.log('Jalankan', this.formulir)
    },
    beli () {
      if (this.token === '') {
        // console.log('silahkan login dulu')
      } else if (this.semuaCart.length === 0) {
      } else {
        console.log(this.semuaCart)
        this.addTransaksi()
        this.getTransaksi()
      }
    },
    ...mapActions([
      'getToken',
      'getCart',
      'getDataUser',
      'getFormulir',
      'addTransaksi',
      'getTransaksi'
    ])
  },
  created () {
    this.getToken()
    if (!this.token) {
      // console.log('Get Token dari created =========> Status : Belum Login')
    } else {
      if (this.token === 'null') {
        // console.log('Token-nya Null')
      } else {
        this.getDataUser()
      }
    }
  },
  watch: {
    semuaCart: function (data) {
    },
    // dataPengguna: function (data) {
    //   console.log('dari watch =========> dataUser baru terbaca')
    // },
    token: function (data) {
      let self = this
      self.getDataUser()
      // console.log('dari watch =========> token baru terbaca')
    },
    role: function (data) {
      // console.log('dari watch =========> role baru terbaca')
      this.getToken()
      // this.getDataUser()
    },
    dataPengguna: function (data) {
      // console.log('dari watch =========> dataPengguna baru terbaca')
    },
    transaksi: function (lihat) {
      this.getTransaksi()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  margin-bottom: 0px;
}
.container-fluid {
  background-color: #000000;
}
ul.dropdown-cart{
    min-width:300px;
}
ul.dropdown-cart li .item{
    display:block;
    padding:3px 10px;
    margin: 3px 0;
}
ul.dropdown-cart li .item:hover{
    background-color:#f3f3f3;
}
ul.dropdown-cart li .item:after{
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}

ul.dropdown-cart li .item-left{
    float:left;
}
ul.dropdown-cart li .item-left img,
ul.dropdown-cart li .item-left span.item-info{
    float:left;
}
ul.dropdown-cart li .item-left span.item-info{
    margin-left:10px;
}
ul.dropdown-cart li .item-left span.item-info span{
    display:block;
}
ul.dropdown-cart li .item-right{
    float:right;
}
ul.dropdown-cart li .item-right button{
    margin-top:14px;
}
#login-dp{
    min-width: 250px;
    padding: 14px 14px 0;
    overflow:hidden;
    background-color:rgba(255,255,255,.8);
}
#login-dp .help-block{
    font-size:12px
}
#login-dp .bottom{
    background-color:rgba(255,255,255,.8);
    border-top:1px solid #ddd;
    clear:both;
    padding:14px;
}
#login-dp .social-buttons{
    margin:12px 0
}
#login-dp .social-buttons a{
    width: 49%;
}
#login-dp .form-group {
    margin-bottom: 10px;
}
.btn-fb{
    color: #fff;
    background-color:#3b5998;
}
.btn-fb:hover{
    color: #fff;
    background-color:#496ebc
}
.btn-tw{
    color: #fff;
    background-color:#55acee;
}
.btn-tw:hover{
    color: #fff;
    background-color:#59b5fa;
}
@media(max-width:768px){
    #login-dp{
        background-color: inherit;
        color: #fff;
    }
    #login-dp .bottom{
        background-color: inherit;
        border-top:0 none;
    }
}
.image {
  width: 25%;
}
</style>
