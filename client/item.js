new Vue({
  el:'#item',
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
    allItems:[]
  },
  methods:{
    addItem(items){
      console.log(items);
      axios.post('http://localhost:3000/api/items', items)
      .then(response=>{
        this.allItems.push(response.data)
        this.items._id='';
        this.items.category='';
        this.items.productId='';
        this.items.productName='';
        this.items.price=0;
        this.items.quantity=0;
        this.items.discount=0;
        this.items.imageUrl='';
        this.items.summary='';
      })
      .catch(err=>{
        console.log(err);
      })
    },
    removeItem(id){
      axios.delete(`http://localhost:3000/api/items/${id}`)
      .then(response=>{
        var newItems = this.allItems.filter(item => item._id != response.data.data._id)
        this.allItems = newItems
      })
      .catch(err=>{
        console.log(err);
      })
    },
    findById(id){
      var newItem = this.allItems.filter(item => item._id == id)
      // this.editItem =
      this.items._id=newItem[0]._id;
      this.items.category=newItem[0].category;
      this.items.productId=newItem[0].productId;
      this.items.productName=newItem[0].productName;
      this.items.price=newItem[0].price;
      this.items.quantity=newItem[0].quantity;
      this.items.discount=newItem[0].discount;
      this.items.imageUrl=newItem[0].imageUrl;
      this.items.summary=newItem[0].summary;
    },
    editItem(items){
      // console.log('tessssss=',items._id);
      axios.put(`http://localhost:3000/api/items/${items._id}/`,items)
      .then(response=>{
        var newItems=this.allItems,
            itemEdited=items
        for (var i = 0; i < newItems.length; i++) {
          if (newItems[i]._id==itemEdited._id){
            newItems[i]._id=itemEdited._id;
            newItems[i].category=itemEdited.category;
            newItems[i].productId=itemEdited.productId;
            newItems[i].productName=itemEdited.productName;
            newItems[i].price=itemEdited.price;
            newItems[i].quantity=itemEdited.quantity;
            newItems[i].discount=itemEdited.discount;
            newItems[i].imageUrl=itemEdited.imageUrl;
            newItems[i].summary=itemEdited.summary;
          }
        }
        this.allItems = newItems
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created: function(){
    // if (localstorage.token){
    //   axios.get('http://localhost:3000/api/items/${localstorage.token}', )
    // }
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
