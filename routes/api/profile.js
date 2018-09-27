const express = require('express');
const router = express.Router();


//@route    GET api/profile/test
//@desc     gets a test message
//@access   public
router.get('/profile', (req, res) => res.json({msg: "profile works"}));

module.exports = router;