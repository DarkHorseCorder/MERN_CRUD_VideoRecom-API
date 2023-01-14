const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({ error: "please provide a token" })
    else {
        console.log("Provided token==========================>" , token.split(" ")[1])
        console.log("secret token=======================>" , tokenSecret)
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            console.log(value)
            console.log(err)
            // if (err) res.status(500).json({ error: 'failed to authenticate token' })
            // req.user = value.data
            next()
        })
    }
}