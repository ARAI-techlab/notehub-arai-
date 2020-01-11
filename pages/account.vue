<template>
  <div>
    <!-- ログイン中に表示される画面 -->
    <div v-if="isAuthenticated">
      {{ user.email }}でログイン中です<br>
      <button v-on:click="logout">ログアウト</button><br>
      <a href="/member-page">メンバーページへ</a>
    </div>
    <!-- ログインしていない時に表示される画面 -->
    <div v-else>
      <p><a href="/register-user">新規会員登録</a></p>
      <button @click="googleLogin">googleでログイン</button><br>
      <button @click="facebookLogin">Facebookでログイン</button><br>
      メール<br>
      <input type="text" v-model="email"><br>
      パスワード<br>
      <input type="password" v-model="password"><br>
      <button v-on:click="login">ログイン</button><br>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  asyncData () {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },
  computed: {
    //...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      };
    })
  },
  methods : {
    ...mapActions(['setUser']),
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // ログインしたら飛ぶページを指定
        // this.$router.push("/member-page")
      }).catch((error) => {
        alert(error)
      });
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
      }).catch((error) => {
        alert(error)
      })
    },
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },
    facebookLogin () {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken
      // The signed-in user info.
      var user = result.user
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
      // ...
    });
    }
  }
}
</script>