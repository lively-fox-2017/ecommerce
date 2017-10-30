new Vue({
  el:'#checkout',
  data:{
    allCart:[],
    total:0,
    customer:{
      cName:'',
      cAddres:'',
      cPhone:'',
      cEmail:''
    },
    idTransaction:''
  },
  methods:{
    countTotal(){
      let total=0;
      for (var i = 0; i < this.allCart.length; i++) {
        total+=Number(this.allCart[i].amount);
      }
      return this.total=total;
    },
    addTransaction(customer,allCart){
      let data=[customer,allCart];
      axios.post('http://localhost:3000/api/transactions/',data)
      .then(response=>{
        // console.log(response);
        localStorage.removeItem("ect-cart");
        localStorage.removeItem("ect-checkout");
        this.idTransaction=response.data.transactionId;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    done(){
      window.location.href = "http://localhost:8080/index.html"
    }
  },
  mounted: function(){
    if (localStorage.getItem("ect-token")==null) {
      window.location.href = "http://localhost:8080/login.html"
    }
  },
  created: function(){
    this.allCart=JSON.parse(localStorage.getItem("ect-cart"))
    if (!this.allCart) {
      this.allCart=[];
    } else {
      this.countTotal()
    };
  }
})
