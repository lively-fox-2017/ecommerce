new Vue({
  el: '#app',
  data: {
    products: [],
    formData: {
      isUpdate:false,
      _id: '',
      name: '',
      price: '',
      description: '',
      imgUrl: ''
    }
  },
  methods: {
    getAllProducts() {
      axios.get('http://localhost:3000/api/product').then((response) => {
        console.log(response)
        this.products = response.data;
      }).catch((err) => {
        console.error(err)
      })
    },
    addNewData(){
      showForm();
      this.formData = {}
      this.formData.isUpdate = false;
    },
    populateForm(id) {
      showForm();
      var index = this.products.findIndex((product)=>{
        if(product._id == id){
          return product;
        }
      })
      this.formData = this.products[index]
      this.formData.isUpdate = true;
    },
    deleteData() {

    }
  },
  created() {
    this.getAllProducts();
  }
})
