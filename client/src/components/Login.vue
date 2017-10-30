<template lang="html">
  <form class="form-style-login" @submit.prevent="login(formAdmin)">
    <h1> LOGIN </h1>
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
      }
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
        console.log('ini data login', data)
        localStorage.setItem('token', data)
        if (data !== null) {
          this.$router.push('/admin')
        } else {
          console.log('jika tidak di temukan')
          this.$router.push('/daftar-admin')
        }
      })
      .catch((err) => console.error(err))
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
