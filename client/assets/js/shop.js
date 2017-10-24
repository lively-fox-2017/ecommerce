new Vue({
  el: '#app',
  data: {
    products: [],
    carts:[],
    hargaTotal:0
  },
  methods: {
    getAllProducts() {
      axios.get('http://localhost:3000/api/product').then((response) => {
        console.log(response)
        this.products = response.data;
      }).catch((err) => {
        console.error(err)
      })
    },
    toggleSmall (id) {
      $('#'+id).toggleClass('small', 200);
    },
    tambahCart(id) {
      if(localStorage.getItem('accessToken')){
        var index = this.products.findIndex((product)=>{
          if(product._id == id){
            return product;
          }
        })
        var obj = this.products[index];
        obj.qty = 1;
        obj.totalPrice = obj.price * obj.qty;
        this.carts.push(obj);
        this.calculateHargaTotal()
      }
      else {
        alert('login dulu bosq')
      }
    },
    calculatePrice(id) {
      var index = this.carts.findIndex((cart)=>{
        if(cart._id == id){
          return cart
        }
      })
      this.carts[index].totalPrice = this.carts[index].price * this.carts[index].qty
      this.calculateHargaTotal()
    },
    calculateHargaTotal() {
      this.hargaTotal = 0;
      for(var i = 0;i<this.carts.length;i++){
        this.hargaTotal += this.carts[i].totalPrice;
      }
    },
    doSearch() {
      var search = $('#search').val();
      var hasilSearch = [];
      this.products.forEach(product=>{
        if(product.name.toLowerCase().indexOf(search.toLowerCase()) > -1){
          hasilSearch.push(product)
        }
      })
      this.products = hasilSearch;
    },
    doLogin() {
      var email = $('#email').val();
      var password = $('#password').val();
      axios.post('http://localhost:3000/api/auth/login', {email:email, password:password}).then((response)=>{
        localStorage.setItem('accessToken', response.data.token);
        location.reload();
      }).catch((err)=>{
        console.error(err);
      })
    },
    doRegister() {
      var email = $('#email').val();
      var password = $('#password').val();
      var name = $('#name').val();
      axios.post('http://localhost:3000/api/auth/register', {email:email, password:password, name:name}).then((response)=>{
        $('#modal3').modal('close');
      }).catch((err)=>{
        console.error(err);
      })
    },
    isLogin() {
      if(localStorage.getItem('accessToken')){
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
      var totalHarga = this.hargaTotal;
      var customer_id = localStorage.getItem('accessToken');
      var productlist = [];
      this.carts.forEach((cart)=>{
        productlist.push(cart._id);
      })
      axios.post('http://localhost:3000/api/transaction', {customer_id:customer_id, productlist:productlist, totalHarga:totalHarga}).then((response)=>{
        console.log(response)
      }).catch((err)=>{
        console.error(err);
      })
    }
  },
  created() {
    this.getAllProducts();
  }
})
