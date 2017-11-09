import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  semuaProduk: [],
  semuaCart: [],
  totalCart: 0,
  loginUser: '',
  dataPengguna: [],
  token: '',
  role: '',
  formulir: false,
  produkbaru: [],
  transaksi: []
}

const mutations = {
  dapatkanSemuaProduk (state, payload) {
    state.semuaProduk = payload
  },
  masukanKeranjang (state, payload) {
    let penyaringan = state.semuaCart.findIndex((test) => {
      return test._id === payload._id
    })
    if (penyaringan === -1) {
      payload.jumlah = 1
      state.semuaCart.push(payload)
      state.totalCart += payload.harga
    } else {
      let count = state.semuaCart[penyaringan].jumlah
      state.semuaCart.splice(penyaringan, 1)
      payload.jumlah = count + 1
      state.semuaCart.push(payload)
      state.totalCart += payload.harga
      // state.semuaCart[penyaringan].jumlah += 1
    }
    // console.log(state.semuaCart)
  },
  login (state, payload) {
    state.loginUser = payload
    state.role = payload.role
  },
  dataUser (state, payload) {
    state.dataPengguna = payload
    state.role = payload.role
  },
  cekToken (state, payload) {
    if (payload === '') {
      state.role = ''
    }
    state.token = payload
  },
  masukanProduk (state, payload) {
    state.produkbaru = payload
  },
  dapatkanTransaksi (state, payload) {
    // state.transaksi = payload
    // console.log(payload)
    let ambil = []
    for (var i = 0; i < payload.length; i++) {
      let sementara = []
      let qwt = payload[i].produk[0].jumlahitem
      let prod = payload[i].produk[0].idproduct
      for (var j = 0; j < qwt.length; j++) {
        sementara.push({
          namaproduct: prod[j].namaproduct,
          harga: prod[j].harga,
          quantity: qwt[j]
        })
      }
      ambil.push(sementara)
    }
    state.transaksi = ambil
    // console.log('ini transaksi', state.transaksi)
  }
}

const actions = {
  getProductAll ({commit}) {
    http.get('/product')
    .then(({data}) => {
      commit('dapatkanSemuaProduk', data)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  getCart ({commit}, data) {
    // console.log(penyaringan)
    commit('masukanKeranjang', data.data)
  },
  login ({commit}, data) {
    // console.log(data.username)
    http.post('/user/login', {
      username: data.username,
      password: data.password
    })
    .then(({data}) => {
      if (data.token === null) {
        // console.log('Tokennya', null)
      } else {
        localStorage.setItem('token', data.token)
        commit('login', data)
      }
    })
    .catch((dataError) => {
      console.error('Error', dataError)
    })
  },
  getDataUser ({commit}) {
    if (!state.token) {
    } else {
      var datadecode = state.token
      var decoded = jwtDecode(datadecode)
      // console.log('inilah hasillllllll decode', decoded)
      if (!decoded) {
      } else {
        commit('dataUser', decoded)
      }
    }
    // state.dataPengguna = []
    // http.get('/user/one', {
    //   headers: {
    //     token: state.token
    //   }
    // })
    // .then(({data}) => {
    //   // console.log('=============>', data)
    //   // localStorage.setItem('ini data user', data)
    //   commit('dataUser', data)
    //   // console.log('hanyatoken', data)
    // })
  },
  getToken ({commit}) {
    let token = localStorage.getItem('token')
    if (token === 'undefined') {
    } else if (token === null) {
      commit('cekToken', '')
    } else {
      commit('cekToken', token)
    }
  },
  getFormulir ({commit}) {
    state.formulir = !state.formulir
  },
  addProduct ({commit}, data) {
    // console.log('Data dari Store ======> ', data)
    http.post('/product', {
      namaproduct: data.namaproduct,
      deskripsi: data.deskripsi,
      linkimage: data.linkimage,
      harga: Number(data.harga)
    })
    .then(({data}) => {
      commit('masukanProduk', data)
    })
  },
  addTransaksi ({commit}) {
    let idproduct = []
    let idmember = state.dataPengguna.id
    let jumlahitem = []
    for (var i = 0; i < state.semuaCart.length; i++) {
      // console.log('dari store', state.semuaCart[i])
      idproduct.push(state.semuaCart[i]._id)
      jumlahitem.push(state.semuaCart[i].jumlah)
    }
    http.post('/transaction', {
      idmember: idmember,
      idproduct: idproduct,
      jumlahitem: jumlahitem,
      date: new Date()
    })
    .then(({data}) => {
      // console.log('Sudah di Store', data)
    })
  },
  getTransaksi ({commit}) {
    http.get('/transaction')
    .then(({data}) => {
      commit('dapatkanTransaksi', data)
    })
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
