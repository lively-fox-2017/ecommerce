new Vue({

  el: '#app',

  data: {

    items: []

  },

  methods: {

    fetchItems () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/items'
      })
        .then((response) => {
          this.items = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    }

  },

  created: function () {

    this.fetchItems();

  }

});

// ---------------------------------------------------------

$('#show-shopping-cart').click(function (event) {
  event.preventDefault();
  $('#shopping-cart-modal').modal('show');
});

$('#show-login').click(function (event) {
  event.preventDefault();
  $('#login-modal').modal('show');
});

$('#show-register').click(function (event) {
  event.preventDefault();
  $('#login-modal').modal('hide');
  $('#register-modal').modal('show');
});

$('#register-modal').on('hidden.bs.modal', function (event) {

  $('#login-modal').modal('show');

});

$('.quantity-field').bootstrapNumber({
  upClass: 'primary',
  downClass: 'primary'
});
