new Vue({
  el: '#app',
  data: {
    transactions: [],
  },
  methods: {
    getAllTransactions() {
      axios.get('http://localhost:3000/api/transaction').then((response) => {
        response.data.forEach(res =>{
          res.productlist = res.productlist.map(product => {return product.name});
        })
        this.transactions = response.data;
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  created() {
    axios.post('http://localhost:3000/api/auth/isAdmin', {token:localStorage.getItem('accessToken')}).then((response) => {
      console.log(response);
      this.getAllTransactions();
    }).catch((err) => {
      console.error(err)
    })
  }
})
