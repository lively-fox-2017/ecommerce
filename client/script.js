var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    items: [{brand:"YoyoJams"}] ,
    itemIdx: 0,
    cartprice:0,
    cart:[],
    itemquant:1

  },
  methods:{
    getAllItem(){
      axios.get("http://localhost:3000/items")
      .then(response=>{
        // console.log(response.data.data);
        this.items=response.data.data;
        // console.log(JSON.stringify(this.items));
      }).catch(err=>{
        console.log(err);
      })
    }
    ,
    addCart(total){
      let selectedItem = { item:this.items[this.itemIdx] , total:this.itemquant  };
      this.cart.push(selectedItem);
      this.itemquant=1;
    },
    totalCart(){
      let price = 0
      this.cart.forEach(list=>{
        price += list.item.price * list.total
      })
      this.cartprice=price
    },
    removeCart(idx){
      this.cart.splice(idx,1)
      this.totalCart()
    }
    ,
    clearCart(){
      this.cart=[];
    }

  },
  created:function(){
    this.getAllItem();
  }

})
