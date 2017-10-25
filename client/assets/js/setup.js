Vue.component('checkout-component', {
  props: ['item', 'qty'],
  template: `
  <div class="card">
    <div class="content">
      <img class="right floated mini ui image" :src="item.image">
      <div class="header">
        {{item.name}}
      </div>
      <div class="meta">
        {{item.price}}
      </div>
      <div class="description">
        Qty:
        <div class="ui input">
          {{ qty }}
        </div>
      </div>
      <div class="description">
        {{item.description}}
      </div>
    </div>
  </div>
  `
})
Vue.component('cart-component', {
  data() {
    return {
      qty: 1,
    };
  },
  methods: {
    changeQty() {
      this.$emit('add-cart-qty', this.itemId, this.qty);
    },
    cancelThis() {
      this.display = "none";
      console.log('aseolole', this.display);
    }
  },
  watch: {
    qty(newQty) {
      this.changeQty()
    }
  },
  props: ['item', 'itemId', 'display'],
  template: `
  <div class="card" :style="display">
    <div class="content">
      <img class="right floated mini ui image" :src="item.image">
      <div class="header">
        {{item.name}}
      </div>
      <div class="meta">
        {{item.price}}
      </div>
      <div class="description">
        Qty:
        <div class="ui input">
          <input v-model="qty" placeholder="qty" type="number" min="1" value="1">
        </div>
      </div>
      <div class="description">
        {{item.description}}
      </div>
    </div>
    <div class="extra content">
      <div class="ui red button" @click="cancelThis">Cancel</div>
    </div>
  </div>
  `
})

Vue.component('list-product', {
  methods: {
    addToCart(item) {
      this.$emit('add-to-cart', item);
    }
  },
  props: ['item', 'itemId'],
  template: `
  <div class="card">
    <div class="image">
      <img :src="item.image" alt="product">
    </div>
    <div class="content">
      <div class="header">{{ item.name }}</div>
      <div class="meta">
        <a>Price: {{item.price}}</a>
      </div>
      <div class="description">
        {{item.description}}
      </div>
    </div>
    <div class="extra content">
      <div v-on:click="addToCart(item)" class="ui vertical animated button" id="button-id" tabindex="0">
        <div class="hidden content">Shop</div>
        <div class="visible content">
          <i class="shop icon"></i>
        </div>
      </div>
    </div>
  </div>
  `
})
Vue.component('signup-content', {
  data() {
    return {
      username: '',
      password: '',
      fullname: '',
    };
  },
  methods: {
    signup() {
      axios.post('http://api-ecommerce/auth/signup', {
          username: this.username,
          password: this.password,
          fullname: this.fullname
        })
        .then((response) => {
          console.log(response);
          $('#signup-modal').modal('hide');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  template: `
  <div class="content">
    <form class="ui form" name="signup-form">
      <div class="field">
        <label>User Name</label>
        <input v-model="username" name="username" placeholder="User Name" type="text" required>
      </div>
      <div class="field">
        <label>Full Name</label>
        <input v-model="fullname" placeholder="Full Name" type="text" required>
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" name="password" placeholder="Password" type="password" required>
      </div>
      <button class="ui button" type="submit" v-on:click.prevent="signup">Submit</button>
    </form>
  </div>
  `
})
Vue.component('login-content', {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios.post('http://api-ecommerce/auth/login', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role);
          $('#login-modal').modal('hide');
          this.$emit('login');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  template: `
  <div class="content">
    <form class="ui form" name="signup-form">
      <div class="field">
        <label>User Name</label>
        <input v-model="username" name="username" placeholder="User Name" type="text" required>
      </div>
      <div class="field">
        <label>Password</label>
        <input v-model="password" name="password" placeholder="Password" type="password" required>
      </div>
      <button class="ui button" type="submit" v-on:click.prevent="login">Login</button>
    </form>
  </div>
  `
})

new Vue({
  el: '#app',
  data: {
    isLogin: false,
    isShowList: false,
    products: [],
    carts: [],
    carts_detail: [],
    qty: [],
    isShowCart: true,
    show: false,
  },
  methods: {
    setLoginStatus() {
      this.isShowList = false;
      this.isLogin = !this.isLogin;
      if (!this.isLogin)
        localStorage.removeItem(['token', 'role']);
    },
    showLogin() {
      $('#login-modal').modal('show');
    },
    showSignup() {
      $('#signup-modal').modal('show');
    },
    getProducts(category) {
      axios.get('http://api-ecommerce/products/' + category)
        .then((products) => {
          this.products = products.data;
          this.isShowList = true;
        })
        .catch((err) => {
          console.error(err);
        })
    },
    showCart() {
      $('#cart-modal')
        .modal({
          onApprove: function() {
            return false;
          }
        })
        .modal('show');
    },
    addToCart(item) {
      this.show = true;
      var self = this;
      setTimeout(function() {
        self.show = false;
      }, 1000);
      this.carts.push({
        productId: item._id,
        qty: 1,
      });
      this.carts_detail.push(item);
    },
    addCartQty(index, qty) {
      this.carts[index].qty = qty;
    },
    checkout() {
      axios.post('http://api-ecommerce/transaction/add', {
          token: localStorage.getItem('token'),
          orders: this.carts,
        })
        .then((value) => {
          this.isShowCart = false
          console.log(value);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
})
