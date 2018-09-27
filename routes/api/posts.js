const express = require('express');
const router = express.Router();


//@route    GET api/posts/test
//@desc     gets a test message
//@access   public
router.get('/test', (req,res) => res.json({msg:'posts works'})
);

module.exports = router;