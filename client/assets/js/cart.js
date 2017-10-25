new Vue({
  el: ".flex-container",
  data: {
    items: [],
    cart: [],
    productObjectId: [],
    quantity: [],
    totalPrice: 0,
    totalPriceRupiah: 'Rp 0'
  },

  methods: {
    formatRupiah(angka){
      let counter = 1;
      let rupiah = ''
      let price = angka.toString().split('').reverse()
      for (let i = 0; i < price.length; i++) {
        rupiah += price[i]
        if (counter % 3 === 0 && i !== price.length-1){
          rupiah += "."
        }

        counter++
      }

      rupiah = "Rp "+rupiah.split('').reverse().join('')

      return rupiah;
    },

    findAll() {
      axios.get("http://localhost:3000/products").then((response) => {
        // console.log(response.data.data);
        response.data.data.forEach((row) => {

          let Items = {
            id: row._id,
            name: row.name,
            url: row.url,
            price: row.price,
            rupiah: this.formatRupiah(row.price),
            stock: row.stock,
            info: row.info
          }

          this.items.push(Items)
        })
      }).catch((reason) => {
        console.log(reason);
      })
    },

    addItem(index){
      // console.log(index);
      if (localStorage.getItem('token')) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === this.items[index].id) {
            return "nothing to push"
          }
        }

        let arrObj = {
          id: this.items[index].id,
          name: this.items[index].name,
          url: this.items[index].url,
          price: this.items[index].price,
          totalHarga: 0,
          formatHarga: "Rp 0",
          stock: this.items[index].stock,
          info: this.items[index].info
        }

        this.cart.push(arrObj)
        this.productObjectId.push(this.items[index].id)
        this.quantity.push(0)
        // console.log(JSON.stringify(this.cart[this.cart.length-1]));
      } else {
        alert("You must login to Add Item")
      }
    },

    removeItem(index) {
      this.cart.splice(index, 1)
      this.productObjectId.splice(index, 1)
      this.quantity.splice(index, 1)
      this.totalPrice = 0;

      for (let i = 0; i < this.cart.length; i++) {
        this.totalPrice += this.cart[i].totalHarga
      }

      this.totalPriceRupiah = this.formatRupiah(this.totalPrice)
    },

    saveItems(){
      if (this.quantity.indexOf(0) !== -1) {
        alert("Quantity Cannot Zero, please remove the item if you dont want to buy it")
      } else {
        let dataCart = {
          user: localStorage.getItem('token'),
          product: this.productObjectId,
          quantity: this.quantity,
          checkout_date: new Date(),
          totalprice: this.totalPrice
        }

        axios.post("http://localhost:3000/transactions/insert", dataCart).then((response) => {
          // console.log(response);
          alert(response.data.message)
        }).catch((reason) => {
          console.log(reason);
        })

        this.cart = []
        this.productObjectId = []
        this.quantity = []
        this.totalPrice = 0
        this.totalPriceRupiah = 'Rp 0'
      }
    },

    quantityChange(index){
      this.cart[index].totalHarga = this.cart[index].price * $('#quantity'+index).val()
      this.cart[index].formatHarga = this.formatRupiah(this.cart[index].totalHarga)
      this.quantity[index] = Number($('#quantity'+index).val())
      this.totalPrice = 0;

      for (let i = 0; i < this.cart.length; i++) {
        this.totalPrice += this.cart[i].totalHarga
      }

      this.totalPriceRupiah = this.formatRupiah(this.totalPrice)
    },

    login(){
      let data = {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val()
      }

      axios.post("http://localhost:3000/users/login", data).then((response) => {
        if (!response.data.data) {
          alert(response.data.message)
        } else {
          localStorage.setItem('token', response.data.data)
          localStorage.setItem('role', response.data.role)
          window.location.reload()
        }
      }).catch((reason) => {
        console.log(reason);
      })
    },

    register(){
      let data = {
        username: $('input[name=signusername]').val(),
        password: $('input[name=signpassword]').val(),
        email: $('input[name=email]').val(),
        phone: $('input[name=phone]').val()
      }

      axios.post("http://localhost:3000/users/register", data).then((response) => {
        // alert(response.data.message)
        if (!response.data.data) {
          // console.log(response);
          alert(response.data.message.errmsg);
        } else {
          alert(response.data.message)
          localStorage.setItem('token', response.data.data)
          localStorage.setItem('role', response.data.role)
          console.log(response);
          window.location.reload()
        }
      }).catch((reason) => {
        console.log(reason);
      })
    },

    logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      window.location.reload()
    }
  },

  created: function(){
    this.findAll();
    // console.log(this.items);
  }
})
