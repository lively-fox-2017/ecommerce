new Vue({
  el:'#app',
  data: {
    counter:'',
    items:[],
    categories:[],
    search:''
  },

  computed: {
    carts:{
      get(){
        let carts = localStorage.getItem("cart")
        if (carts) {
          let unique = JSON.parse(carts).filter((set => f => !set.has(f.item_Name) && set.add(f.item_Name))(new Set))
          return unique
        }else {
          console.log('carts kosong');
        }
      }
    },

    filteredProduct() {
      var self = this
      return this.items.filter(function(item){
        return item.item_Name.toLowerCase().indexOf(self.search.toLowerCase())>=0;
      });
    }
  },

  beforeMount(){
    this.getAll(),
    this.getCategories(),
    this.qty()
  },

  methods:{
    addCart(product) {
      if (this.carts) {
        let obj_cart = this.carts
        obj_cart.push(product)
        localStorage.setItem('cart', JSON.stringify(obj_cart))
        location.reload()
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
      axios.get('http://localhost:3001/api/items')
      .then((response)=>{
        this.items = response.data.dataItems
      })
      .catch(err=>{
        console.log(err);
      })
    },

    getCategories(){
      axios.get('http://localhost:3001/api/categories')
      .then((response)=>{
        this.categories = response.data.dataCategories
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }

})
