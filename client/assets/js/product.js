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
      imageUrl: '',
      category: '',
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
    deleteData(id) {
      axios.delete('http://localhost:3000/api/product/'+id).then((response) => {
        var index = this.products.findIndex((product)=>{
          if(product._id == response.data.data._id){
            return product;
          }
        })
        this.products.splice(index, 1);
      }).catch((err) => {
        console.error(err)
      })
    },
    saveData() {
      if(this.formData.isUpdate){
        axios.put('http://localhost:3000/api/product/'+this.formData._id, this.formData).then((response) => {
          var index = this.products.findIndex((product)=>{
            if(product._id == response.data.data._id){
              return product;
            }
          })
          this.products[index] = response.data.data;
        }).catch((err) => {
          console.error(err)
        })
      }
      else {
        axios.post('http://localhost:3000/api/product', this.formData).then((response) => {
          this.products.unshift(response.data.data);
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  },
  created() {
    axios.post('http://localhost:3000/api/auth/isAdmin', {token:localStorage.getItem('accessToken')}).then((response) => {
      console.log(response);
      this.getAllProducts();
    }).catch((err) => {
      console.error(err)
      window.location.href = "/";
    })
  }
})
