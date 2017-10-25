new Vue({
    el:"#app",
    data:{
        message: 'Welcome Aboard!',
        items: []
    },
    mounted: function(){
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


Vue.component('todo-item', {
    props: ['todo'],
    template: `<div class="four wide column">
    <div class="ui card">
                <img v-bind:src="todo.imageUrl" v-bind:alt="todo.itemname" width="300px" heigth="100px">
                    <div class="ui vertical animated button" tabindex="0">
                            <div class="hidden content" id="shopnow">$ {{todo.price}}</div>
                            <div class="visible content">
                                <i class="shop icon"></i>
                            </div>
                        </div>
                    </div>
                </div>`
})
