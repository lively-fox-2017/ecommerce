<template lang="html">
  <form class="form-style-login" @submit.prevent="login(formAdmin)">
    <h1> LOGIN </h1>
    <p style="color:red"><b>{{ message }}</b></p>
    <div class="form-group">
      <label class="control-label" for="focusedInput">Username</label>
      <input class="form-control" id="focusedInput" type="text" placeholder="Username" v-model="formAdmin.username">
    </div>
    <div class="form-group">
      <label class="control-label" for="focusedInput">Password</label>
      <input class="form-control" id="focusedInput" type="password" placeholder="Password" v-model="formAdmin.password">
    </div>
    <div class="form-group">
      <button type="submit" name="button" class="btn btn-primary"> Login</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      formAdmin: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    login (dataLogin) {
      axios.post('http://localhost:3000/admin/login', dataLogin)
      // console.log('masuk action login', dataLogin)
      .then(({ data }) => {
        // commit(data)
        console.log('---->', data)
        localStorage.setItem('token', data)
        if (data !== 'akun anda belum terdaftar') {
          this.$router.push('/admin')
        } else {
          this.message = 'akun belum terdaftar'
        }
      })
      .catch((err) => console.error('kalo error', err))
    }
  }
}
</script>

<style lang="css">
form.form-style-login {
  background-color: #eee;
  padding: 15px;
}
</style>
