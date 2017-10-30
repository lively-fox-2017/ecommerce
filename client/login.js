new Vue({
  el:'#login',
  data:{
    user:{
      _id:'',
      username:'',
      password:'',
      email:'',
      imageUrl:'',
    }
  },
  methods:{
    signUp(user){
      axios.post('http://localhost:3000/api/signup', user)
      .then(response => {
        this._id='',
        this.username='',
        this.password='',
        this.email='',
        this.imageUrl='',
        console.log(response.data);
        alert(response.data.message)
      })
      .catch(err => {
        console.log(err);
      })
    },
    login(user){
      axios.post('http://localhost:3000/api/signin', user)
      .then(response => {
        this._id='';
        this.username='';
        this.password='';
        this.email='';
        this.imageUrl='';
        localStorage.setItem('ect-token',response.data.token);
        localStorage.setItem('ect-role',response.data.role);
        console.log(response.data);
        alert(response.data.message);
        window.location.href = 'http://localhost:8080/index.html';
      })
      .catch(err => {
        console.log(err);
        alert(err);
      })
    },
    nexPage(response){
      console.log(response.token);
      localStorage.setItem('ect-token',response.token);
      localStorage.setItem('ect-role',response.role);
      if (localStorage.getItem("ect-checkout")) {
        window.location.href = 'http://localhost:8080/checkout.html';
      } else {
        window.location.href = 'http://localhost:8080/index.html';
      }
    },
    loginFB(){
      var self=this;
      window.FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
      });
      function statusChangeCallback(response) {
        if (response.status === 'connected') {
          if (localStorage.getItem("ect-token")==null) {
            $.post('http://localhost:3000/api/signin/FB',{
              accessToken: response.authResponse.accessToken,
              userId: response.authResponse.userID
            },function(response){
              self.nexPage(response)
            })
          }
        } else {
          window.FB.login(function(response) {
            if (response.authResponse) {
              //  console.log('Welcome!  Fetching your information.... ');
              //  FB.api('/me', function(response) {
              //    console.log('Good to see you, ' + response.name + '.');
              //  });
              $.post('http://localhost:3000/api/signin/FB',{
                accessToken: response.authResponse.accessToken,
                userId: response.authResponse.userID
              },function(response){
                self.nexPage(response)
              })
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
          });
        }
      }
    }
  },
  mounted: function(){
    if (localStorage.getItem("ect-token")!=null) {
      window.location.href = 'http://localhost:8080/index.html';
    }
    window.fbAsyncInit = function() {
      // var self = this;
      FB.init({
        appId      : 1417604558350660,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      // FB.getLoginStatus(function(response) {
      //     statusChangeCallback(response);
      // });
    };
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
})
