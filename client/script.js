new Vue({
    el:"#app",
    data:{
        message: 'Welcome Aboard!',
        items: [],
        cart: []
    },
    methods:{
        buy: function(product){
            console.log(this.cart);
            this.cart.push({"name": product.itemname, "price": product.price})
            console.log(this.cart);
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


Vue.component('product-item', {
    props: ['product'],
    template: `<div class="four wide column">
                <div class="ui card">
                <img v-bind:src="product.imageUrl" v-bind:alt="product.itemname" width="300px" heigth="100px">
                    <div class="ui vertical animated button" tabindex="0" @buy="buy(product)">
                            <div class="hidden content">$ {{product.price}}</div>
                            <div class="visible content">
                                <i class="shop icon"></i>
                            </div>
                        </div>
                    </div>
                </div>`,
    methods: {
        buy: function (product) {
            this.$emit('buy', product)
        }
    }
})
