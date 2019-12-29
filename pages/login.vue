<template>
  <div class="container">
    <button @click="login">login</button>
    <button @click="logout">logout</button>
    <p v-if="userData!=null">ログイン中</p>
    <p v-else>ログアウト中</p>
    <p>{{userData}}</P>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
    data(){
        return{userData:''}
    },
  methods: {
    login: function(){
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },
    logout: function(){
        firebase.auth().signOut();
    },
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.userData = user;
        location.href = "/";
      } else {
        this.userData = null;
      };
    });
  },
}
</script>
