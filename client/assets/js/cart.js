new Vue({
  el: ".flex-container",
  data: {
    items: [],
    item: {},
    users: [],
    user: {},
    transactions: [],
    // image: '',
    uploadedFile: '',
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

    findAllProduct() {
      axios.get("http://localhost:3000/products").then((response) => {
        // console.log(response.data.data);
        response.data.data.forEach((row) => {

          let Items = {
            _id: row._id,
            name: row.name,
            imgName: row.imgName,
            imgUrl: row.imgUrl,
            price: row.price,
            rupiah: this.formatRupiah(row.price),
            stock: row.stock,
            info: row.info
          }

          this.items.push(Items)
          // console.log(this.items.imgUrl);
        })
      }).catch((reason) => {
        console.log(reason);
      })
    },

    findAllUser() {
      axios.get("http://localhost:3000/users")
      .then((response) => {
        // console.log(response.data.data);
        this.users = response.data.data
      }).catch((reason) => {
        console.log(reason);
      })
    },

    findAllTransaction() {
      axios.get('http://localhost:3000/transactions')
      .then((response) => {
        // console.log(response.data.data);
        response.data.data.forEach((row) => {
          let Obj = {
            _id: row._id,
            user: row.user.username,
            product: row.product,
            quantity: row.quantity,
            totalprice: this.formatRupiah(row.totalprice)
          }

          this.transactions.push(Obj)
        })
      }).catch((reason) => {
        console.log(reason);
      })
    },

    fileChange(e){
      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return
      }

      // console.log(files[0]);
      this.uploadedFile = files[0];
      // console.log(this.uploadedFile);
    },

    insertProduct(file) {
      $('#loading').show(1000)
      // let image = $('input[name=addimage]').val()
      let name = $('input[name=addname]').val()
      let price = $('input[name=addprice]').val()
      let stock = $('input[name=addstock]').val()
      let info = $('textarea[name=addinfo]').val()

      const formData = new FormData();
      formData.append('image', this.uploadedFile);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('info', info);

      // console.log(imageFile.files[0]);
      axios.post('http://localhost:3000/products/insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        $('#loading').hide(200)
        // console.log(response);
        response.data.data.rupiah = this.formatRupiah(response.data.data.price)
        this.items.push(response.data.data)
        this.uploadedFile = ''
        $('.adminproduct').show(200)
        $('.addproductform').hide(200)

        document.getElementById("addproductform").reset();
      }).catch((reason) => {
        console.log("------>> "+reason);
      })
    },

    editProduct(index) {
      let item = this.items[index]
      $('.editproductform').show(200)
      $('.adminproduct').hide(200)

      this.item = item
      this.item.index = index
    },

    updateProduct(index) {
      let id = this.item._id
      // console.log(id);
      let productObj = {
        name : $('input[name=editname]').val(),
        price : $('input[name=editprice]').val(),
        stock : $('input[name=editstock]').val(),
        info : $('textarea[name=editinfo]').val()
      }

      // console.log(productObj)
      axios.put('http://localhost:3000/products/update/'+id, productObj)
      .then((response) => {
        if (response.data.data) {
          console.log(this.items[index]);
          this.items[index].name = productObj.name
          this.items[index].price = productObj.price
          this.items[index].rupiah = this.formatRupiah(productObj.price)
          this.items[index].stock = productObj.stock
          this.items[index].info = productObj.info

          this.item = {}
          $('.editproductform').hide(200)
          $('.adminproduct').show(200)
        } else {
          alert(response.message);
        }
      }).catch((reason) => {
        console.log(reason);
      })
    },

    deleteProduct(index) {
      let id = this.items[index]._id
      console.log(this.items[index].imgName);
      axios.delete('http://localhost:3000/products/delete/'+id,
        {
          headers: {
            'imgname': this.items[index].imgName
          }
        })
      .then((response) => {
        // console.log(response);
        this.items.splice(index, 1)
      }).catch((reason) => {
        console.log(reason);
      })
    },

    insertUser() {
      let userObj = {
        username: $('input[name=addusername]').val(),
        password: $('input[name=addpassword]').val(),
        email: $('input[name=addemail]').val(),
        phone: $('input[name=addphone]').val()
      }

      axios.post('http://localhost:3000/users/insert', userObj)
      .then((response) => {
        if (response.data.data) {
          this.users.push(response.data.data)
          $('.adduserform').hide(200)
          $('.adminuser').show(200)
        } else {
          let err = response.data.message.errmsg.split(" ")

          alert(err[err.length-2]+" Already used");
        }
      }).catch((reason) => {
        console.log(reason);
      })
    },

    editUser(index) {
      let user = this.users[index]
      $('.edituserform').show(200)
      $('.adminuser').hide(200)

      this.user = user
      this.user.index = index
      // console.log(this.user);
      // console.log(this.users);
    },

    updateUser(index) {
      let id = this.user._id
      // console.log(id);
      let userObj = {
        username: $('input[name=editusername]').val(),
        email: $('input[name=editemail]').val(),
        phone: $('input[name=editphone]').val()
      }

      // console.log(this.user);
      // console.log(userObj);
      axios.put('http://localhost:3000/users/update/'+id, userObj)
      .then((response) => {
        if (response.data.data) {
          this.users[index].username = userObj.username
          this.users[index].email = userObj.email
          this.users[index].phone = userObj.phone

          this.user = {}
          $('.edituserform').hide(200)
          $('.adminuser').show(200)
        } else {
          // console.log(response);
          let err = response.data.message.errmsg.split(" ")

          alert(err[err.length-2]+" Already used");
        }
      }).catch((reason) => {
        console.log(reason);
      })
    },

    deleteUser(index) {
      let id = this.users[index]._id
      axios.delete('http://localhost:3000/users/delete/'+id)
      .then((response) => {
        this.users.splice(index, 1)
      }).catch((reason) => {
        console.log(reason);
      })
    },

    deleteTransaction(index) {
      let id = this.transactions[index]._id
      console.log();
      axios.delete(`http://localhost:3000/transactions/delete/`+id)
      .then((response) => {
        this.transactions.splice(index, 1)
      }).catch((reason) => {
        console.log(reason);
      })
    },

    addItem(index){
      // console.log(index);
      if (localStorage.getItem('token')) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === this.items[index]._id) {
            return "nothing to push"
          }
        }

        let arrObj = {
          id: this.items[index]._id,
          name: this.items[index].name,
          imgName: this.items[index].imgName,
          imgUrl: this.items[index].imgUrl,
          price: this.items[index].price,
          totalHarga: 0,
          formatHarga: "Rp 0",
          stock: this.items[index].stock,
          info: this.items[index].info
        }

        this.cart.push(arrObj)
        // console.log(this.cart);
        this.productObjectId.push(this.items[index]._id)
        this.quantity.push(0)
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

        // console.log(dataCart);
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
          let err = response.data.message.errmsg.split(" ")

          alert(err[err.length-2]+" Already used");
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
    this.findAllProduct();
    this.findAllUser();
    this.findAllTransaction();
    // console.log(this.items);
  }
})
