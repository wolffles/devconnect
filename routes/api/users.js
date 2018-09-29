const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require("../../validation/login");

//load User model
const User = require('../../models/User');

//@route    GET api/users/test
//@desc     gets a test message
//@access   public
router.get('/test', (request, response) => response.json({msg: "Users Works"})
);

//@route    POST api/users/test
//@desc     Register user
//@access   public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation if isValid is false isValid checks if its empty so if not empty
    if(!isValid){
        return res.status(400).json(errors); //status code 400 is bad request.
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({email: 'Email already exists'});
            } else {
                     const avatar = gravatar.url(
                       req.body.email,
                       {
                         s: "200", // Size
                         r: "pg", //rating
                         d: "mm" //Default
                       }
                     );
                     // avatar: avatar in es6 you can just put 1 if they're the same
                     const newUser = new User({
                       name: req.body.name,
                       email: req.body.email,
                       avatar, // avatar: avatar
                       password: req.body.password
                     });

                     bcrypt.genSalt(10, (err, salt) => {
                       bcrypt.hash(
                         newUser.password,
                         salt,
                         (err, hash) => {
                           if (err) console.log(err);
                           newUser.password = hash;
                           newUser
                             .save()
                             .then(user => res.json(user))
                             .catch(err => console.log(err));
                         }
                       );
                     });
                   }
        });
});


//@route    POST api/users/login
//@desc     Login user/ returning JWT Token
//@access   public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation if isValid is false isValid checks if its empty so if not empty
    if (!isValid) {
        return res.status(400).json(errors); //status code 400 is bad request.
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email: email}).then(user => {
        //check for user
        if(!user){
            errors.email = 'User not found'
            return res.status(404).json({email: "User not found"}); //404 means resource not found. )
        }

        //check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    // User matched

                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    } // create JWT payload

                    // Signed Token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 3600 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        }
                        );
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(400)
                    .json(errors);
                }
            });

    });
});

//@route    GET api/users/current
//@desc     Returns current user
//@access   Private
router.get('/current', 
    passport.authenticate('jwt',
    {session: false}),
    (req,res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })
})

module.exports = router;