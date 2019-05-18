const express = require('express');
const router = express.Router();

// Load User model
const Item = require('../../models/Item');

// @route   GET api/items/test
// @desc    Tests items route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Items Works' }));

// @route   GET api/items/add
// @desc    Insert item
// @access  Public (will be protected)
router.post('/add', (req, res) => {

  Item.findOne({ tvid: req.body.tvid }).then(item => {
    if (item) {
      return res.status(400).json(errors);
    } else {
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
