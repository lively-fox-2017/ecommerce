new Vue({
  el: '#app',
  data: {
    transactions: [],
  },
  methods: {
    getAllTransactions() {
      axios.get('http://commaterialize-api.lokilokostudio.tk/api/transaction').then((response) => {
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
    axios.post('http://commaterialize-api.lokilokostudio.tk/api/auth/isAdmin', {token:localStorage.getItem('accessToken')}).then((response) => {
      console.log(response);
      this.getAllTransactions();
    }).catch((err) => {
      console.error(err)
    })
  }
})
