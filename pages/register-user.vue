<template>
  <div>
      メール<br>
      <input type="text" v-model="email"><br>
      パスワード<br>
      <input type="password" v-model="password"><br>
      <p v-if="error_code==='auth/invalid-email'">メールアドレスが不正です</p>
      <button v-on:click="registerUser">登録</button>
  </div>
</template>
  
<script>
import firebase from '~/plugins/firebase'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      error_code:''
    }
  },
  methods : {
    ...mapActions(['setUser']),
    registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.setUser({
            email:this.email,
            password:this.password
          })
          this.$router.push("/")
        })
        .catch(error =>{
          this.error_code = error.code
        });
    }
  }
}
</script>