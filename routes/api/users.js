const express = require('express');
const router = express.Router();


//@route    GET api/user/test
//@desc     gets a test message
//@access   public
router.get('/test', (req, res) => res.json({msg: "Users Works"})
);

module.exports = router;