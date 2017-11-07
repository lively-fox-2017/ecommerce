Vue.component('cart-product', {
    props: ['cart'],
    template: `
    <div class="item">
        {{ cart.name }}       {{ cart.counter }}
        <i class="shopping basket icon"></i>
    </div>
    `
})

Vue.component('product-item', {
    props: ['product'],
    template: `<div class="four wide column">
                <div class="ui card">
                <img v-bind:src="product.imageUrl" v-bind:alt="product.itemname" width="300px" heigth="100px">
                    <div class="ui vertical animated button" tabindex="0" v-on:click="buy(product)">
                        <div class="hidden content">$ {{product.price}}</div>
                            <div class="visible content">
                                <i class="shop icon"></i>
                            </div>
                        </div>
                    </div>
                </div>`,
    methods: {
        buy: function (product) {
            // console.log('halo halo');
            this.$emit('buy', product)
        }
    }
})

Vue.component('modal', {
    template: `
<div class="ui modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
<div>`
})

new Vue({
    el: "#app",
    data: {
        showModal: false,
        message: 'Welcome Aboard!',
        items: [],
        cart: []
    },
    methods: {
        buy: function (product) {
            console.log('ini produknya yang dibeli ',product);
            let idx = this.cart.findIndex((itemcart)=>{return itemcart._id === product._id})
            if (idx == -1) {
                let obj = {
                    _id: product._id,
                    name: product.itemname,
                    price: product.price,
                    counter: 1
                }
                this.cart.push(obj)
                console.log('ini isi cartnya ya ',this.cart);
            } else {
                this.cart[idx].counter += 1
                console.log('ini kalo itemnya sama ', this.cart);
            }
        },
        checkout: function () {
            // localStorage.setItem('buyItem', cart)
            console.log('checkout');
            axios.post('http://localhost:3000/carts', {
                itemlist: this.cart
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (err) {
                console.log(err);
            })
        }
    },
    mounted: function () {
        var self = this
        axios.get('http://localhost:3000/items')
            .then(function (response) {
                // console.log(response);
                self.items = response.data
                console.log(self.items)
            })
            .catch(function (err) {
                console.log(err);
            })
    }
})