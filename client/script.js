new Vue({
  el:'#app',
  data: {
    message: 'hello',
    counter:0,
    items:[]
  }, methods:{
    addCart: function (product) {
      if (this.carts) {
        let obj_cart = this.carts
        obj_cart.push(product)
        localStorage.setItem('cart', JSON.stringify(obj_cart));
      }else {
        var cart2 = []
        cart2.push(product)
        localStorage.setItem('cart', JSON.stringify(cart2))
      }
      this.qty()
    },

    qty() {
      this.counter = this.carts.length
    }
  },

  created(){
    axios.get('http://localhost:3001/items')
    .then((response)=>{
      this.items = response.data
    })
    .catch(err=>{
      console.log(err);
    })
  },

  computed: {
    carts:{
      get() {
        let carts = localStorage.getItem("cart")
        return JSON.parse(carts);
      }
    }
  }

})
