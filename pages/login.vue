<template>
  <div class="container">
    
    <!--  ログインボタン。今のところはgoogleのみのログイン -->
    <button @click="login">login</button> 
     
    <!--  ログアウトボタン。本来は、このページにログアウトボタンは必要ないが、開発中はあると便利なのでつけておく -->
    <button @click="logout">logout</button>

    <!--  変数：userDataの中身がnullではなければ、ログイン中であるということなので（詳しくはscriptの方で解説）
    「ログイン中」と出るようにしている。 -->
    <p v-if="userData!=null">ログイン中</p>

    <!--  変数：userDataの中身がnullならば、ログインしていない状態であるということなので
    「ログインしてないよ」と出るようにしている。 -->
    <p v-else>ログインしてないよ</p>
    
    <!--  変数：userDataの中身を表示する。
    ログイン中であれば、ログインユーザに関する情報やログインステータスに関する情報がぎっしりと表示される。
    本来は必要ないが、開発中の勉強の足しになると思うので、表示するようにしている。 -->
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
    //↓ログインボタンが押された時の処理。firebaseの機能でグーグル認証に連携する。
    login: function(){
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    },

    //↓ログインボタンが押された時の処理。firebaseの機能でグーグル認証に連携する。
    logout: function(){
        firebase.auth().signOut();
    },
  },

  //mountedは、ページ生成時に発動させたい関数を用意するところ。
  mounted: function() {
    //↓現在ログイン中のユーザのステータスを取得する関数。
    //ログイン状態であれば、userに値が入っているため、if(user)の結果はtrueとなりif(user)以降の処理に進む。
    //逆にログインしていない状態であれば、userに値が入っていないため、if(user)はfalseとなり、elseの処理の方へ進む。
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //この処理では、↑の方にあるdata(){}で用意している変数、userDataに取得したユーザのステータス"user"を入れる
        this.userData = user;
      } else {
        //この処理では、↑の方にあるdata(){}で用意している変数、userDataにnullを入れる。
        this.userData = null;
      };
    });
  },
}
</script>
