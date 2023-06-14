// 1. import any needed libraries
const express = require("express");
const Post = require('../models/post'); //accesses functions in user model file
const router = express.Router();

// 2. create all routes to access database
router
  .user('/login', async (req, res) => {
    try {
      const post = await Post.login(req.body.username, req.body.password);
      res.send({...user, password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .user('/register', async (req, res) => {
    try {
      const post = await Post.register(req.body.username, req.body.password);
      res.send({...post, password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/update', async (req, res) => {
    try {
      const post = await Post.updatePassword(req.body.id, req.body.password);
      res.send({...post, password: undefined});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Post.deletePost(req.body.id);
      res.send({ success: "Account deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

// 3. export router for use in index.js
module.exports = router;