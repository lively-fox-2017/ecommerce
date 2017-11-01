Vue.component('cart-product', {
    props: ['cart'],
    template: `
    <div class="item">
        {{ cart.name }}
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

new Vue({
    el: "#app",
    data: {
        message: 'Welcome Aboard!',
        items: [],
        cart: []
    },
    methods: {
        buy: function (product) {

            console.log(this.cart);
            this.cart.push({_id: product._id, name: product.itemname, price: product.price})
            console.log(this.cart);
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