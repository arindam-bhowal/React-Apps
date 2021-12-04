const jwt = require('jsonwebtoken');
const jwtSign = 'This is me Arindam Bhowal'

const authenticateUser = (req, res, next) => {

    const authtoken = req.header('authorization')

    if (!authtoken) {
        res.status(401).json({ 'error': 'Please authenticate using a valid token' })
    }
    try {
        jwt.verify(authtoken, jwtSign , (err, user) => {
            // console.log(err)
            // console.log(user)

            if (err) return res.sendStatus(403)

            req.user = user

            next()
        })

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token' })
    }
}

module.exports = authenticateUser