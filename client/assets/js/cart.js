new Vue({
  el: ".flex-container",
  data: {
    items: [],
    cart: [],
    totalPrice: 0,
    totalPriceRupiah: 'Rp 0'
  },

  methods: {
    rupiah(){
      let angka = 1;
      let rupiah = ''
      let totalPrice = this.totalPrice.toString().split('').reverse()
      for (let i = 0; i < totalPrice.length; i++) {
        rupiah += totalPrice[i]
        if (angka % 3 === 0 && i !== totalPrice.length-1){
          rupiah += "."
        }

        angka++
      }

      rupiah = "Rp "+rupiah.split('').reverse().join('')

      return rupiah;
    },

    findAll() {
      axios.get("http://localhost:3000/products").then((response) => {
        // console.log(response.data.data);
        response.data.data.forEach((row) => {
          let arrRupiah = row.price.toString().split('').reverse()
          let rupiah = '';
          let angka = 1;
          for (let i = 0; i < arrRupiah.length; i++) {
            rupiah += arrRupiah[i]
            if (angka % 3 === 0 && i !== arrRupiah.length-1) {
              rupiah += "."
            }
            angka++
          }

          rupiah = "Rp "+rupiah.split('').reverse().join('')

          let Items = {
            id: row._id,
            name: row.name,
            url: row.url,
            price: row.price,
            rupiah: rupiah,
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
            // this.totalPrice += this.items[index].price
        }

        this.totalPrice += this.items[index].price;
        this.totalPriceRupiah = this.rupiah()
        this.cart.push(this.items[index])
      } else {
        alert("You must login to Add Item")
      }
    },

    removeItem(index) {
      this.totalPrice -= this.cart[index].price
      this.totalPriceRupiah = this.rupiah()
      this.cart.splice(index, 1)
    }
  },

  created: function(){
    this.findAll();
    // console.log(this.items);
  }
})
