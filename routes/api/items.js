const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

// Load Item model
const Item = require('../../models/Item');

// @route   GET api/items/test
// @desc    Tests items route
// @access  Protected
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => res.json({ msg: 'Items Works' }));

// @route   POST api/items/add
// @desc    Insert item or update when necessary
// @access  Prtected
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (req.body.remarks === undefined || req.body.remarks === null){
    req.body.remarks = "";
  }

  if (typeof req.body.place !== 'undefined'){
    req.body.place = req.body.place.split(',');
  }

  const newItem = {};

  if(req.body.tvid) newItem.tvid = req.body.tvid;
  if(req.body.tvname) newItem.tvname = req.body.tvname;
  if(req.body.showtype) newItem.showtype = req.body.showtype;
  if(req.body.place) newItem.place = req.body.place;
  if(req.body.remarks) newItem.remarks = req.body.remarks;
  if(req.body.link) newItem.link = req.body.link;
  
  Item.findOne({ tvid: req.body.tvid }).then(item => {
    if (item) {
      //update the existing item
      Item.findOneAndUpdate(
        { tvid: req.body.tvid },
        { $set: newItem },
        { new: true}
      ).then(item => res.json(item))
      .catch(err => console.log(err));
      
    } else {
      //create new item
      new Item(newItem)
        .save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
      
    }
  });
});

// @route   GET api/items/id/:id
// @desc    Get items by ID for editing
// @access  Private

router.get('/id/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Item.findOne({ _id: req.params.id })
    .then(item => {
      if (!item) {
        errors.noitem = 'There is no TV Series associated with this ID';
        res.status(404).json(errors);
      }

      res.json(item);

    })
    .catch(err =>
      res.status(404).json({ item: 'There is no TV Series associated with this ID' })
    );
});

// @route   GET api/items/tvid/:tvid
// @desc    Get items by TVID for editing
// @access  Private

router.get('/tvid/:tvid', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Item.findOne({ tvid: req.params.tvid })
    .then(item => {
      if (!item) {
        errors.noitem = 'There is no TV Series associated with this TVID';
        res.status(404).json(errors);
      }

      res.json(item);

    })
    .catch(err =>
      res.status(404).json({ item: 'There is no TV Series associated with this TVID' })
    );
});

// @route   GET api/items/all
// @desc    Get all items
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Item.find()
    .then(item => {
      if (!item) {
        errors.noitem = 'There are no TV Series in the Database';
        return res.status(404).json(errors);
      }

      res.json(item);
    })
    .catch(err => res.status(404).json({ item: 'There are no TV Series in the Database' }));
});

module.exports = router;
