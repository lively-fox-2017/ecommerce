new Vue({
  el:'#index',
  data:{
    items:{
      _id:'',
      category:'',
      productId:'',
      productName:'',
      price:0,
      quantity:0,
      discount:0,
      imageUrl:'',
      summary:''
    },
    allItems:[],
    myCart:[],
    total:0,
    customer:{
      cName:'',
      cAddres:'',
      cPhone:'',
      cEmail:''
    }
  },
  methods:{
    countTotal(){
      let total=0;
      for (var i = 0; i < this.myCart.length; i++) {
        total+=Number(this.myCart[i].amount);
      }
      return this.total=total;
    },
    countAmount(price,quantity,discount){
      if (discount==0) {
        discount=1;
      }
      return Number(price)*Number(quantity)*Number(discount);
    },
    countItem(){
      $(".my-cart").text(`Cart(${this.myCart.length})`);
    },
    addItemToCart(items){
      let newItem=true;
      for (var i = 0; i < this.myCart.length; i++) {
        if (this.myCart[i]._id==items[0]) {
          this.myCart[i].quantity++;
          this.myCart[i].amount=this.countAmount(this.myCart[i].price,this.myCart[i].quantity,this.myCart[i].discount)
          newItem=false;
          break;
        }
      }
      if (newItem) {
        this.myCart.push({
          _id:items[0],
          productId:items[1],
          productName:items[2],
          price:items[3],
          quantity:items[4],
          discount:items[5],
          imageUrl:items[6],
          amount:this.countAmount(items[3],items[4],items[5])
        })
      }
      this.countTotal();
      this.countItem();
      localStorage.setItem('ect-cart', JSON.stringify(this.myCart))
    },
    changeQtyItemCart(id){
      let qty=0;
      for (var i = 0; i < this.$refs.itemCart.length; i++) {
        if (this.$refs.itemCart[i].id==id){
          qty=this.$refs.itemCart[i].value;
          break
        }
      }
      for (var i = 0; i < this.myCart.length; i++) {
        if (this.myCart[i]._id==id) {
          if (this.myCart[i].quantity>0) {
            this.myCart[i].quantity=qty;
            this.myCart[i].amount=this.countAmount(this.myCart[i].price,this.myCart[i].quantity,this.myCart[i].discount);
          }
          break;
        }
      }
      this.countTotal();
      this.countItem();
      localStorage.setItem('ect-cart', JSON.stringify(this.myCart))
    },
    removeItemCart(id){
      let newCart=this.myCart;
      for (var i = 0; i < this.myCart.length; i++) {
        if (this.myCart[i]._id==id) {
          newCart.splice(i,1);
          break;
        }
      }
      this.myCart=newCart;
      this.countTotal();
      this.countItem();
      localStorage.setItem('ect-cart', JSON.stringify(this.myCart))
    },
    addTransaction(customer,myCart){
      let data=[customer,myCart];
      axios.post('http://localhost:3000/api/transactions/',data)
      .then(response=>{
        console.log(response.data);
        localStorage.removeItem("ect-cart");
        window.location.href = "http://localhost:8080/succesfull_transactions.html"
      })
      .catch(err=>{
        console.log(err);
      })
    },
    login(){
      if (localStorage.getItem("ect-token")==null) {
        window.location.href = 'http://localhost:8080/login.html';
      } else {
        localStorage.removeItem('ect-token');
        localStorage.removeItem('ect-role')
        $(".login").text("Login");
        alert('Logout Berhasil')
      }
    },
    checkOut(){
      // console.log('jangkir',Number(this.total),0);
      if (Number(this.total)>0) {
        if (localStorage.getItem("ect-token")==null) {
          localStorage.setItem('ect-checkout',0)
          window.location.href = 'http://localhost:8080/login.html';
        } else {
          localStorage.setItem('ect-checkout',1)
          window.location.href = 'http://localhost:8080/checkout.html';
        }
      }
    },
    addItem(){
      let role=localStorage.getItem("ect-role");
      console.log(role);
      if (role=='admin') {
        window.location.href = 'http://localhost:8080/item.html';
      }
    }
  },
  mounted: function(){
    if (localStorage.getItem("ect-token")!=null) {
      $(".login").text("Logout");

    }
  },
  created: function(){
    $(".addItem").css("visibility: hidden");
    this.myCart=JSON.parse(localStorage.getItem("ect-cart"))
    if (!this.myCart) {
      this.myCart=[];
      this.countItem();
    } else {
      this.countTotal();
      this.countItem();
    }
    axios.get('http://localhost:3000/api/items/')
    .then(response=>{
      console.log(response.data);
      this.allItems=response.data
    })
    .catch(err=>{
      console.log(err);
    })
  }
})
