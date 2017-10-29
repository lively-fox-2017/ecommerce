new Vue({
  el:'#app',
  data: {
    message: 'hello',
    counter:0,
    carts:
    {
      id: 0,
      item: [],
      price: 0,
      qty: 0,
      imgUrl: '',
      total: 0
    },
    items:[]
  }, methods:{
    addCart: function () {
      this.carts.qty++
      this.carts.item.push(this.items[0].nama)
      console.log(this.carts.item);

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
  }

})
