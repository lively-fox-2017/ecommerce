new Vue({
  el:'#app',
  data: {
    counter:'',
    items:[],
    search:''
  },

  computed: {
    carts:{
      get(){
        let carts = localStorage.getItem("cart")
        if (carts) {
          return JSON.parse(carts);
        }else {
          console.log('carts kosong');
        }
      }
    },

    filteredProduct() {
      var self = this
      return this.items.filter(function(item){
        return item.nama.toLowerCase().indexOf(self.search.toLowerCase())>=0;
      });
    }
  },

  beforeMount(){
    this.getAll(),
    this.qty()
  },

  methods:{
    addCart(product) {
      if (this.carts) {
        let obj_cart = this.carts
        obj_cart.push(product)
        localStorage.setItem('cart', JSON.stringify(obj_cart));
      }else {
        var cart2 = []
        cart2.push(product)
        localStorage.setItem('cart', JSON.stringify(cart2))
        location.reload()
      }
      this.qty()
    },

    qty() {
      if (!this.carts) {
        this.counter = 0
      }else {
        this.counter = this.carts.length
      }
    },

    getAll(){
      axios.get('http://localhost:3001/items')
      .then((response)=>{
        this.items = response.data
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }

})
