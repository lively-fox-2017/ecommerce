new Vue({
  el: ".flex-container",
  data: {
    items: [],
    cart: [],
    quantity: 0,
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
        // console.log(JSON.stringify(this.cart[this.cart.length-1]));
      } else {
        alert("You must login to Add Item")
      }
    },

    removeItem(index) {
      this.cart.splice(index, 1)
      this.totalPrice = 0;

      for (let i = 0; i < this.cart.length; i++) {
        this.totalPrice += this.cart[i].totalHarga
      }

      this.totalPriceRupiah = this.formatRupiah(this.totalPrice)
    },

    quantityChange(index){
      this.cart[index].totalHarga = this.cart[index].price * $('#quantity'+index).val()
      this.cart[index].formatHarga = this.formatRupiah(this.cart[index].totalHarga)
      this.totalPrice = 0;

      for (let i = 0; i < this.cart.length; i++) {
        this.totalPrice += this.cart[i].totalHarga
      }

      this.totalPriceRupiah = this.formatRupiah(this.totalPrice)
    }
  },

  created: function(){
    this.findAll();
    // console.log(this.items);
  }
})
