const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// Load User model
const Item = require('../../models/Item');

// @route   GET api/items/test
// @desc    Tests items route
// @access  Protected
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => res.json({ msg: 'Items Works' }));

// @route   GET api/items/add
// @desc    Insert item
// @access  Prtected
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Item.findOne({ tvid: req.body.tvid }).then(item => {
    if (item) {
      errors.tviderror = 'Duplicate TVID insertion detected!';
      return res.status(400).json(errors);
    } else {
      if (req.body.remarks === undefined || req.body.remarks === null){
        req.body.remarks = "";
      }
      const newItem = new Item({
        tvid: req.body.tvid,
        tvname: req.body.tvname,
        showtype: req.body.showtype,
        place: req.body.place,
        remarks: req.body.remarks,
        link: req.body.link,
      });

      newItem
        .save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
      
    }
  });
});

module.exports = router;
