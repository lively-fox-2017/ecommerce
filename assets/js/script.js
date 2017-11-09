new Vue({
  // var Rp = require('../helpers/rupiah')
  el: '#app',
  data: {
    item: {
      nama_item: '',
      category: '',
      harga: '',
      jumlah: 0,
      img: ''
    },
    allItem: [],
    allCart: [],
    count: 0,
    total: 0
  },
  methods: {

    addedItem(item) {
      axios.post('http://localhost:3000/items', item)
        .then(response => {
          this.allItem.push(response.data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    getAllItem(){
      axios.get('http://localhost:3000/items')
      .then(response=>{
        this.allItem = response.data
      })
      .catch(err=>{
        console.log(err);
      })
    },

    deleteItems(id){
      console.log('berak',id);
      axios.delete('http://localhost:3000/items/'+id)
      .then((response)=>{
        console.log('Deleted');
      })
      .catch(err=>{
        console.log(err);
      })
    },

    addCart(item){
      var itemIdx = this.allCart.findIndex(function (itemInCart) {
        return itemInCart._id === item._id
      })
      if (itemIdx == -1) {
         item.qty = 1
         this.allCart.push(item);
         this.count+=1
      }  else {
         return -1
      }
    },
    addQty (itemIdx) {
      this.allCart[itemIdx].qty++
    },
    checkOut () {
      window.location.href = 'http://localhost:5000/purchase.html';
    },
    sumTotalCart(id){

    },
    removeCart(id){
      let remCart=this.allCart;
      for (var i = 0; i < this.allCart.length; i++) {
        if (this.allCart[i]._id==id) {
          remCart.splice(i,1);
          break;
        }
      }
      this.allCart=remCart;
      this.count-=1;
    }
  },
  created () {
    console.log('Created!');
  },
  mounted (){
    this.getAllItem()
    console.log('Mounted',this.getAllItem());
  }
})
