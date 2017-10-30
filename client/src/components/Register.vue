<template lang="html">
  <form class="form-style-register" @submit.prevent="register(formAdmin)">
    <h1> REGISTER </h1>
    <div class="form-group">
      <label class="control-label" for="focusedInput">Username</label>
      <input class="form-control" id="focusedInput" type="text" placeholder="Username" v-model="formAdmin.username">
    </div>
    <div class="form-group">
      <label class="control-label" for="focusedInput">Password</label>
      <input class="form-control" id="focusedInput" type="password" placeholder="Password" v-model="formAdmin.password">
    </div>
    <div class="form-group  has-success">
      <label class="control-label" for="focusedInput">Role</label>
      <input class="form-control"  id="inputSuccess" type="text" placeholder="admin" disabled="">
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary"> Register</button>
    </div>
  </form>
</template>

<script>
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
      'register'
    ])
  }
}
</script>

<style lang="css">
form.form-style-register {
  background-color: #eee;
  padding: 15px;
}
</style>
