new Vue({
  el: '#app',
  data: {
    customers: [],
    formData: {
      isUpdate:false,
      _id: '',
      name: '',
      email: '',
      password: '',
      role: ''
    },
    selected:'admin'
  },
  methods: {
    getAllCustomers() {
      axios.get('http://localhost:3000/api/customer').then((response) => {
        console.log(response)
        this.customers = response.data;
      }).catch((err) => {
        console.error(err)
      })
    },
    addNewData(){
      this.formData = {}
      this.formData.isUpdate = false;
      this.formData.role = 'user';
      showForm();
    },
    populateForm(id) {
      showForm();
      var index = this.customers.findIndex((customer)=>{
        if(customer._id == id){
          return customer;
        }
      })
      this.formData = this.customers[index]
      this.formData.isUpdate = true;
    },
    deleteData() {

    }
  },
  created() {
    this.getAllCustomers();
  }
})
