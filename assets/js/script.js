new Vue({
  el: '#app',
  data: {
    item: {
      nama_item: '',
      category: '',
      harga: '',
      jumlah: '',
      img: ''
    },
    allItem: [],
    allCart: [],
    count: 0
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
