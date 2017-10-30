new Vue({
  el:'#app',
  data:{
    items: {
      image:'',
      description:'',
      price:'',
      cart:0
      // console.log('oi');
    },
    itemGoods: []
  },
  methods:{
    increase: function(){
      this.cart++;
    },
    addItem(items){
      axios.post('http://localhost:3000/item',items )
      .then(function (response) {
        console.log(response);
        this.itemGoods.push(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getItem(item){
      axios.get('http://localhost:3000/item',item)
      .then(function (response) {
        console.log(('response', response.data));
        this.itemGoods = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
})
