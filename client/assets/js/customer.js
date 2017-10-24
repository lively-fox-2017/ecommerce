new Vue({
  el: '#app',
  data: {
    customers: [],
    formData: {
      isUpdate: false,
      _id: '',
      name: '',
      email: '',
      password: '',
      role: ''
    },
    selected: ''
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
    addNewData() {
      this.formData = {}
      this.formData.isUpdate = false;
      showForm();
    },
    populateForm(id) {
      showForm();
      var index = this.customers.findIndex((customer) => {
        if (customer._id == id) {
          return customer;
        }
      })
      this.formData = this.customers[index]
      this.formData.isUpdate = true;
    },
    deleteData(id) {
      axios.delete('http://localhost:3000/api/customer/' + id).then((response) => {
        var index = this.customers.findIndex((customer) => {
          if (customer._id == response.data.data._id) {
            return customer;
          }
        })
        this.customers.splice(index, 1);
      }).catch((err) => {
        console.error(err)
      })
    },
    saveData() {
      if (this.formData.isUpdate) {
        axios.put('http://localhost:3000/api/customer/' + this.formData._id, this.formData).then((response) => {
          var index = this.customers.findIndex((product) => {
            if (customer._id == response.data.data._id) {
              return customer;
            }
          })
          this.customers[index] = response.data.data;
        }).catch((err) => {
          console.error(err)
        })
      } else {
        axios.post('http://localhost:3000/api/product', this.formData).then((response) => {
          this.products.unshift(response.data.data);
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  },
  created() {
    this.getAllCustomers();
  }
})
