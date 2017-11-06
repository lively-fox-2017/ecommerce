new Vue({
  el: '#app',
  data: {
    products: [],
    carts: [],
    hargaTotal: 0,
  },
  methods: {
    getAllProducts() {
      return new Promise((resolve, reject) => {
        axios.get('http://commaterialize-api.lokilokostudio.tk/api/product').then((response) => {
          this.products = response.data;
          resolve();
        }).catch((err) => {
          console.error(err)
          reject(err)
        })
      })
    },
    toggleSmall(id) {
      $('#' + id).toggleClass('small', 200);
    },
    tambahCart(id) {
      if (localStorage.getItem('accessToken')) {
        var index = this.products.findIndex((product) => {
          if (product._id == id) {
            return product;
          }
        })
        var checkDulu = this.carts.findIndex((product) => {
          if(product._id == this.products[index]._id) {
            return product
          }
        })
        console.log(checkDulu)
        if (checkDulu > -1) {
          console.log(this.carts[checkDulu]);
          this.carts[checkDulu].qty = this.carts[checkDulu].qty + 1
          this.carts[checkDulu].totalPrice = this.carts[checkDulu].price * this.carts[checkDulu].qty
          this.calculateHargaTotal()
        } else {
          var obj = this.products[index];
          obj.qty = 1;
          obj.totalPrice = obj.price * obj.qty;
          this.carts.push(obj);
          this.calculateHargaTotal()
        }

      } else {
        alert('login dulu bosq')
      }
    },
    removeCart(index) {
      this.carts.splice(index, 1);
    },
    convertRupiah(price) {
      var newPrice = ''
      for (let i = price.length - 1; i >= 0; i--) {
        newPrice += price[i]
        if (i % 3 == 0 && i != price.length - 1 && i != 0) {
          newPrice += "."
        }
      }
      return newPrice.split('').reverse().join('');
    },
    calculatePrice(id) {
      var index = this.carts.findIndex((cart) => {
        if (cart._id == id) {
          return cart
        }
      })
      this.carts[index].totalPrice = this.carts[index].price * this.carts[index].qty
      this.calculateHargaTotal()
    },
    calculateHargaTotal() {
      this.hargaTotal = 0;
      for (var i = 0; i < this.carts.length; i++) {
        this.hargaTotal += this.carts[i].totalPrice;
      }
    },
    doSearch() {
      this.getAllProducts().then(() => {
        var search = $('#search').val();
        var hasilSearch = [];
        this.products.forEach(product => {
          if (product.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            hasilSearch.push(product)
          }
        })
        this.products = hasilSearch;
      }).catch((err) => {
        console.log(err);
      })
    },
    category(category) {
      this.getAllProducts().then(() => {
        var hasilSearch = [];
        this.products.forEach(product => {
          if (product.category.toLowerCase().indexOf(category.toLowerCase()) > -1) {
            hasilSearch.push(product)
          }
        })
        this.products = hasilSearch;
      }).catch((err) => {
        console.log(err);
      })
    },
    checkAdmin () {
      var promise = new Promise((resolve, reject) => {
        axios.post('http://commaterialize-api.lokilokostudio.tk/api/auth/isAdmin', {token:localStorage.getItem('accessToken')}).then((response) => {
          resolve()
        }).catch((err) => {
          reject()
        })
      })
      return promise
    },
    isAdmin () {
      this.checkAdmin().then(()=>{
        return true
      }).catch((err) =>{
        return false
      })
    },
    doLogin() {
      var email = $('#email').val();
      var password = $('#password').val();
      axios.post('http://commaterialize-api.lokilokostudio.tk/api/auth/login', {
        email: email,
        password: password
      }).then((response) => {
        localStorage.setItem('accessToken', response.data.token);
        location.reload();
      }).catch((err) => {
        console.error(err);
      })
    },
    doRegister() {
      var email = $('#email').val();
      var password = $('#password').val();
      var name = $('#name').val();
      axios.post('http://commaterialize-api.lokilokostudio.tk/api/auth/register', {
        email: email,
        password: password,
        name: name
      }).then((response) => {
        $('#modal3').modal('close');
      }).catch((err) => {
        console.error(err);
      })
    },
    isLogin() {
      if (localStorage.getItem('accessToken')) {
        return true;
      } else {
        return false;
      }
    },
    logout() {
      localStorage.removeItem('accessToken')
      location.reload()
    },
    checkout() {
      if (this.carts.length) {
        var totalHarga = this.hargaTotal;
        var customer_id = localStorage.getItem('accessToken');
        var productlist = [];
        this.carts.forEach((cart) => {
          productlist.push(cart._id);
        })
        axios.post('http://commaterialize-api.lokilokostudio.tk/api/transaction', {
          customer_id: customer_id,
          productlist: productlist,
          totalHarga: totalHarga
        }).then((response) => {
          console.log(response)
        }).catch((err) => {
          console.error(err);
        })
      } else {
        alert('Cart minimum have 1 item')
      }
    }
  },
  created() {
    this.getAllProducts();
  }
})
