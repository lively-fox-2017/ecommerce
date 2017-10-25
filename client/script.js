var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    items: [{brand:"YoyoJams"}] ,
    itemsview : [{brand:"YoyoJams"}] ,
    itemIdx: 0,
    cartprice:0,
    cart:[],
    itemquant:1,
    searchstr:'',
    searchItem:[],
    iCart:-1

  },
  methods:{
    getAllItem(){
      axios.get("http://localhost:3000/items")
      .then(response=>{
        this.items=response.data.data;

      }).catch(err=>{
        console.log(err);
      })
    }
    ,
    getsearchItem(){
      if(this.searchstr==''){
        this.items.forEach(item=>{
          item.show=true;
        })
      } else{
        this.searchItem=[]
        this.items.forEach(item=>{
          if((item.name+item.brand).toLowerCase().search(this.searchstr.toLowerCase())!=-1){
            item.show=true
          }else{
            item.show=false
          }
        })
      }
    }
    ,


    addCart(total){


      let i=0
      let cartfound=false
      this.cart.some(list=>{
        if(list.item._id==this.items[this.itemIdx]._id ){
          cartfound=true
          this.iCart=i
          return
        }
        i++
      })
      if(cartfound){
        this.cart[this.iCart].total+=Number(this.itemquant)
      } else{
        let selectedItem = { item:this.items[this.itemIdx] , total:Number(this.itemquant)  };
        this.cart.push(selectedItem);
      }
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
    // ,
    // sendCart(){
    // let userCart= this.cart
    //
    //   axios.post("http://localhost:3000/cart",cartinfo)
    //
    //
    //   this.cart=[];
    //
    // }

  },
  created:function(){
    this.getAllItem();
  }

})
