import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

const state = {
  allProduct: [],
  barangJualan: [],
  admin: []
}

const mutations = {
  setProduct (state, payload) {
    state.allProduct = payload
  },
  tambahProduct (state, payload) {
    state.allProduct.push(payload)
  },
  removeProduct (state, payload) {
    const idx = state.allProduct.findIndex((product) => product._id === payload)
    console.log(idx)
    state.allProduct.splice(idx, 1)
  },
  updateProduct (state, payload) {
    state.allProduct = payload
  },
  pushCart (state, payload) {
    // console.log('ini payload yang di pushCart --->', payload)
    const idxBarangJualan = state.barangJualan.findIndex(function (barangYgDiItems) {
      console.log('barangYgDiItems id ---->', barangYgDiItems.namaProduct)
      console.log('payload id ---->', payload.namaProduct)
      return barangYgDiItems.namaProduct === payload.namaProduct
    })
    if (idxBarangJualan === -1) {
      payload.quantity = 1
      state.barangJualan.push(payload)
      // localStorage.setItem('dataCart', state.barangJualan)
    } else {
      console.log('---else-->', state.barangJualan[idxBarangJualan])
      state.barangJualan[idxBarangJualan].quantity += 1
    }
    // state.barangJualan.push(payload)
  },
  setAddCart (state, payload) {
    state.barangJualan = payload
  },
  registerMutations (state, payload) {
    state.admin.push(payload)
  }
}

const actions = {
  getProduct ({ commit }) {
    // console.log('product sudah bisa tampil')
    http.get('/product')
    .then(({ data }) => {
      console.log('data yang di tampilkan product', data)
      commit('setProduct', data)
    })
    .catch((err) => console.error(err))
  },
  submitProduct ({ commit }, newProduct) {
    http.post('/product', newProduct)
    .then(({ data }) => {
      commit('tambahProduct', data)
    })
    .catch((err) => console.error(err))
  },
  deleteProduct ({ commit }, productId) {
    http.delete('/product/' + productId)
    .then(({ data }) => {
      commit('removeProduct', data._id)
    })
    .catch((err) => console.error(err))
  },
  editProduct ({ commit }, payload) {
    console.log(payload, '<----- ini editProduct----')
    http.put('/product/' + payload)
    .then(({ data }) => {
      commit('updateProduct', data)
    })
    .catch((err) => console.error(err))
  },
  addToCart ({ commit }, newData) {
    commit('pushCart', newData)
    // localStorage.setItem('dataAnyar', state.barangJualan)
  },
  removeToCart ({ commit }, barang) {
    console.log(' remove barangJualan', barang)

    barang.quantity -= 1
    if (barang.quantity === 0) {
      state.barangJualan.splice(state.barangJualan.indexOf(barang), 1)
    }
    // state.barangJualan.splice(state.barangJualan.indexOf(barang), 1)
  },
  getAddCart ({ commit }) {
    http.get('/addcart')
    .then(({ data }) => {
      console.log('cart yang akan di tampilkan addcart -->', data)
      commit('setAddCart', data)
    })
    .catch((err) => console.error(err))
  },
  register ({ commit }, dataRegier) {
    console.log('bisa masuk')
    // console.log('ini register', dataRegier)
    http.post('/admin/register', dataRegier)
    // console.log('ini register sudah bisa masuk', dataRegier)
    .then(({ data }) => {
      swal('berhasil register sebagai admin', 'admin baru berhasil di tambah', 'success')
      commit('registerMutations', data)
    })
    .catch((err) => console.error(err))
  },
  selesaiPembelian () {
    state.barangJualan = []
    swal('Terimakasi sudah berbelanja', 'data anda sedang di proses silahkan click lanjutkan belanja untuk ke MENU utama', 'success')
    // this.$router.push('/')
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
