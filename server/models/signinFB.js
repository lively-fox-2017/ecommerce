const jwt = require('jsonwebtoken');
const FB = require('fb');

class SigninFB {
  static signin(body){
    return new Promise(function(resolve,reject){
      let fb = new FB.Facebook({
        accessToken: body.accessToken,
        appId: process.env.FBAPPID,
        appSecret: process.env.FBAPPSECRET
      })
      fb.api('me',{fields:['id','name','email','picture.type(large)'],access_token:body.accessToken},function(response){
        if (response.error) {
            reject(response.error);
        } else {
          console.log('response',response.picture.data.url);
          let token = jwt.sign({
            username: response.id,
            email: response.email,
            imageUrl: response.picture.data.url
          },process.env.APPSECRET);
          resolve({
            message:"Login sukses",
            token:token,
            role:"customer"
          })
        }
      })
    })
  }
}

module.exports = SigninFB;
