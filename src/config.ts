export const  config ={
    NodeMailerOptions:{
        transport:{
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                username:"elawirse@gmail.com",
                pass:"rami1234"
            },
            tls:{
                rejectUnauthorized:false
            }
        }
    },
    fontEndKeys:{
        url:'localhost',
        port:4200,
        endPoints:['auth/resetPassword','auth/verifiedEmail']
    },
    OAuthGoogle:{
        GOOGLE_CLIENT_ID:'918916773749-1cii9abmg8p7dbcpk6lkfq970alc5egh.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET:'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',
        CALL_BACK_URL:'http://localhost:3000/api/auth/google/callback',
        SCOPE:['email','profile']
    },
    OAuthFacebook:{
        FACEBOOK_CLIENT_ID:'',
        FACEBOOK_SECRET_ID:'',
        CALL_BACK_URL:'http://localhost:3000/api/auth/facebook/callback',
        SCOPE:['email']

    }
}


