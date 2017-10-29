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
Vue.component('add-content', {
  data() {
    return {
      itemVal: {
        name: null,
        description: null,
        category: null,
        price: null,
        image: null,
      }
    };
  },
  methods: {
    addProduct() {
      console.log(this.itemVal);
      axios.post(`http://api-ecommerce.mepawz.com/products/add_product/`, {
          name: this.itemVal.name,
          description: this.itemVal.description,
          category: this.itemVal.category,
          price: this.itemVal.price,
          image: this.itemVal.image,
        })
        .then((value) => {
          this.$emit('addSuccess', value.data)
        })
        .catch((err) => {
          console.error(err);
        })
    }
  },
  template: `
  <div class="content">
    <form class="ui form" name="update-product-form">
      <div class="field">
        <label>Name</label>
        <input v-model="itemVal.name" name="name" placeholder="Name" type="text" required>
      </div>
      <div class="field">
        <label>Description</label>
        <input v-model="itemVal.description" name="description" placeholder="Description" type="text" required>
      </div>
      <div class="field">
        <label>Category</label>
        <select v-model="itemVal.category" required>
          <option disabled value="">Please select one</option>
          <option value="new">New Arrival</option>
          <option value="shirt">Shirt</option>
          <option value="t-shirt">T-Shirt</option>
          <option value="pants">Pants</option>
          <option value="bag">Bag</option>
          <option value="footwear">Footwear</option>
        </select>
      </div>
      <div class="field">
        <label>Price</label>
        <input v-model="itemVal.price" name="price" placeholder="Price" type="text" required>
      </div>
      <div class="field">
        <label>Image URL</label>
        <input v-model="itemVal.image" name="image" placeholder="Image URL" type="text" required>
      </div>
      <button class="ui button" type="submit" v-on:click.prevent="addProduct">Submit</button>
    </form>
  </div>
  `
})
Vue.component('update-content', {
  data() {
    return {
      itemVal: {
        name: null,
        description: null,
        category: null,
        price: null,
        image: null,
      },
      show: false
    };
  },
  props: ['item'],
  methods: {
    updateProduct(id) {
      axios.put(`http://api-ecommerce.mepawz.com/products/update_product/${id}`, this.itemVal)
        .then((value) => {
          this.show = true;
          var self = this;
          setTimeout(function() {
            self.show = false;
          }, 1000);
          this.itemVal._id = id;
          this.$emit('updateSuccess', this.itemVal)
        })
        .catch((err) => {
          console.error(err);
        })
    }
  },
  // Update data when prop change [Needed because item is rendered when prop is null]
  watch: {
    item: function(newItem) {
      if (newItem) {
        this.itemVal.name = newItem.name;
        this.itemVal.description = newItem.description;
        this.itemVal.category = newItem.category;
        this.itemVal.price = newItem.price;
        this.itemVal.image = newItem.image;
      }
    }
  },
  template: `
  <div class="content">
    <form class="ui form" name="update-product-form">
      <div class="field">
        <label>Name</label>
        <input v-model="itemVal.name" name="name" placeholder="Name" type="text" required>
      </div>
      <div class="field">
        <label>Description</label>
        <input v-model="itemVal.description" name="description" placeholder="Description" type="text" required>
      </div>
      <div class="field">
        <label>Category</label>
        <select v-model="itemVal.category" required>
          <option disabled value="">Please select one</option>
          <option value="new">New Arrival</option>
          <option value="shirt">Shirt</option>
          <option value="t-shirt">T-Shirt</option>
          <option value="pants">Pants</option>
          <option value="bag">Bag</option>
          <option value="footwear">Footwear</option>
        </select>
      </div>
      <div class="field">
        <label>Price</label>
        <input v-model="itemVal.price" name="price" placeholder="Price" type="text" required>
      </div>
      <div class="field">
        <label>Image URL</label>
        <input v-model="itemVal.image" name="image" placeholder="Image URL" type="text" required>
      </div>
      <button class="ui button" type="submit" v-on:click.prevent="updateProduct(item._id)">Submit</button>
    </form>
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
      axios.post('http://api-ecommerce.mepawz.com/auth/signup', {
          username: this.username,
          password: this.password,
          fullname: this.fullname
        })
        .then((response) => {
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
      error: false,
    };
  },
  methods: {
    login() {
      axios.post('http://api-ecommerce.mepawz.com/auth/login', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.hasOwnProperty('err')) {
            this.error = true;
          } else {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            $('#login-modal').modal('hide');
            this.$emit('login');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  template: `
  <div class="content">
    <div v-if="error" class="ui icon message">
      <i class="notched warning sign icon"></i>
      <div class="content">
        <div class="header">
          Authetication failed
        </div>
        <p>Username and password combination is not match</p>
      </div>
    </div>
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

Vue.component('admin-component', {
  data() {
    return {
      products: [],
      item: null,
      isShowUpdate: false,
      index: null,
    };
  },
  methods: {
    updateProduct(item, index) {
      this.item = item;
      this.index = index;
      $("#update-modal").modal('show');
    },
    deleteProduct(item, index) {
      axios.delete(`http://api-ecommerce.mepawz.com/products/delete_product/${item}`)
        .then((value) => {
          // this.products = [].concat(this.products.slice(0, index), this.products.slice(index + 1));
          this.products.splice(index, 1);
        })
        .catch((err) => {
          console.error(err);
        })
    },
    updateSuccess(item) {
      this.$set(this.products, this.index, item);
      $("#update-modal").modal('hide');
    },
    addProduct() {
      $("#add-modal").modal('show');
    },
    addSuccess(item) {
      this.products.push(item);
      location.reload();
    }
  },
  template: `
    <div class="ui one column grid container">
      <div class="ui modal" id="update-modal">
        <i class="close icon"></i>
        <div class="header">
          <h2>Edit Product</h2>
        </div>
        <update-content @updateSuccess="updateSuccess" :item="item"></update-content>
      </div>
      <div class="ui modal" id="add-modal">
        <i class="close icon"></i>
        <div class="header">
          <h2>Add Product</h2>
        </div>
        <add-content @addSuccess="addSuccess" ></add-content>
      </div>
      <div class="sixteen wide column">
        <div class="ui one buttons">
          <button class="ui button" @click="addProduct">Add Product</button>
        </div>
        <data-table @deleteProduct="deleteProduct" @updateProduct="updateProduct" :products="products">
        </data-table>
      </div>
    </div>
  `,
  created() {
    axios.get('http://api-ecommerce.mepawz.com/products/')
      .then((products) => {
        this.products = products.data;
      })
      .catch((err) => {
        console.error(err);
      })
  }
})

Vue.component('data-table', {
  methods: {
    updateProduct(id, index) {
      this.$emit("updateProduct", id, index);
    },
    deleteProduct(id, index) {
      this.$emit("deleteProduct", id, index);
    }
  },
  props: ['products'],
  template: `
  <div>
    <table id="example" class="ui celled table" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <datatable-body @deleteProduct="deleteProduct" @updateProduct="updateProduct" v-for="(product, index) in products" :key="product._id" :item="product" :index="index">
        </datatable-body>
      </tbody>
    </table>
  </div>
  `,
  updated() {
    //do something after creating vue instance
    let table = $('#example').DataTable({
      destroy: true,
      pageLength: 5,
      lengthMenu: [
        [5, 10, 25, 50, 100, -1],
        [5, 10, 25, 50, 100, 'All']
      ]
    });
    $('#example tbody').on('click', 'button.red', function() {
      var row = table.row($(this).parents('tr'));
      row.remove();
    });
  }
})

Vue.component('datatable-body', {
  methods: {
    updateProduct(item, index) {
      this.$emit("updateProduct", item, index);
    },
    deleteProduct(item, index) {
      this.$emit("deleteProduct", item, index);
    }
  },
  props: ['item', 'index'],
  template: `
    <tr>
      <td>{{item.name}}</td>
      <td>{{item.description}}</td>
      <td>{{item.category}}</td>
      <td>{{item.price}}</td>
      <td><img class="center floated ui image" :src="item.image"></td>
      <td>
        <button class="ui blue button" @click="updateProduct(item, index)">Edit Product</button>
        <button class="ui red button" @click="deleteProduct(item._id, index)">Delete Product</button>
      </td>
    </tr>
  `
})

new Vue({
  el: '#app',
  data: {
    isLogin: false,
    isAdmin: false,
    isShowAdmin: false,
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
      if (!this.isLogin) {
        console.log('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
      if (localStorage.getItem('role') === 'admin')
        this.isAdmin = true;
    },
    showLogin() {
      $('#login-modal').modal('show');
    },
    showSignup() {
      $('#signup-modal').modal('show');
    },
    showAdmin() {
      this.isShowAdmin = !this.isShowAdmin;
    },
    getProducts(category) {
      axios.get('http://api-ecommerce.mepawz.com/products/' + category)
        .then((products) => {
          this.products = products.data;
          this.isShowList = true;
          $('html, body').animate({
            scrollTop: $("#list-product").offset().top
          }, 1000);
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
      axios.post('http://api-ecommerce.mepawz.com/transaction/add', {
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
      if (localStorage.getItem('role') === 'admin')
        this.isAdmin = true;
    } else {
      this.isLogin = false;
    }
  }
})
