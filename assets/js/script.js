new Vue({
  el: '#app',
  data: {
    item: {
      nama_item: '',
      category: '',
      harga: '',
      jumlah: '',
      img: '',

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
        // console.log(response.data);
        console.log('Deleted');
      })
      .catch(err=>{
        console.log(err);
      })
    },
    addCart(id,item){
      // event.preventDefault()
      // localStorage.setItem("ID", id);
      this.allCart.push(item.id,item);
    },
    getItemById(){
      var local = localStorage.getItem("ID")
      axios.get('http://localhost:3000/items/'+local)
      .then(response=>{
        console.log("BERAKK",localStorage.getItem("ID"));
        this.allCart.push(response)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    countCart(){
      this.count++;
    }
  },
  created () {
    console.log('Created!');
    this.getAllItem()
  },
  beforeMount() {
    this.getItemById()
  },
  mounted (){
    this.getItemById()
    console.log('Mounted');
  }
})
