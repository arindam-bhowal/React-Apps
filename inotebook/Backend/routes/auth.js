const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticateUser = require('../middlewares/fetchUser')


const jwtSign = 'This is me Arindam Bhowal'

//Route 1======== Create a user using: Post "/api/auth/createuser" . Does not require auth ==========
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
], async (req, res) => {

    let success = false
    // const user = new User(req.body)
    // user.save()
    // res.send(req.body)


    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    try {

        //  Check wheather the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404).json({ status: success ,message: 'User with this e-mail already exist' })
        }

        // BCryptjs for password security 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        // .then(user => {
        //     res.json(user);
        //    // user.save();
        // });

        // Jwt io- Json web token to skip login once you are loged-in 
        jwtData = user.id
        const jwttoken = jwt.sign(jwtData, jwtSign)

        success =true
        res.json({ 'status': success, 'authTokken': jwttoken })
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send('Unknown error occured!!')
    }
})




//Route 2======== Create a user using: Post "/api/auth/login" . Does not require auth ==========
router.post('/login', [
    body('email').isEmail(),
    body('password', 'Password cannot be left empty').exists()
], async (req, res) => {

    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body

    let success = false
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ 'success': success, 'message': 'Invalid credentials! Input correct credentials to login' })
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({ 'success': success, 'message': 'Invalid credentials! Input correct credentials to login' })
        }

        jwtData = user.id
        const jwttoken = jwt.sign(jwtData, jwtSign)
        success = true
        res.json({ 'success': success, 'authTokken': jwttoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Unknown error occured!!')
    }
})


// Route 3: Get logged in user details using: Post "/api/auth/getuser". Login in required
router.post('/getuser', authenticateUser, async (req, res) => {

    try {
        const userId = req.user
        // const userId = '6191597a4d477cfaece9e06a'
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Unknown error occured!!', error.message)
    }
})

module.exports = router