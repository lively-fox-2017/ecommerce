new Vue({
  el: '#app',
  data: {
    item: {
      id: '',
      nama_item: '',
      category: '',
      harga: '',
      jumlah: '',
      img: ''
    },
    allItem: []
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
        res.send(err)
      })
    },
    deleteItems(id){
      console.log('berak',id);
      axios.delete('http://localhost:3000/items/'+id)
      .then((response)=>{
        console.log(response);
        console.log('Deleted');
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  created () {
    console.log('Created!');
    this.getAllItem()
  },
  mounted (){
    console.log('Mounted');
  }
})
