new Vue({

  el: '#app',

  data: {

    items: [],
    shoppingCartLength: 0,
    shoppingCartItems: [],
    total: 0

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
    }, // eo fetchItems

    findItemIndex (id) {

      const itemIndex = this.shoppingCartItems.findIndex((element) => {

        return element._id === id;

      });

      return itemIndex;

    }, // eo findItemIndex

    updateTotalPrice () {

      this.total = 0;

      this.shoppingCartItems.forEach((item) => {
        this.total += (item.price * item.qty);
      });

    }, // eo updateTotalPrice

    addToCart (item) {

      if (this.findItemIndex(item._id) !== -1) {

        this.shoppingCartItems[itemIndex].qty += 1;

      } else {

        item.qty = 1;
        this.shoppingCartItems.push(item);
        this.shoppingCartLength += 1;

      }

      this.updateTotalPrice();

    }, // eo addToCart

    changeQty (id) {

      const itemIndex = this.findItemIndex(id);
      const newQty = $('#qty-' + id).val();

      this.shoppingCartItems[itemIndex].qty = newQty;

      this.updateTotalPrice();

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
