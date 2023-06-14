// 1. import mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// 2. create schema for entity
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true},
  followers: [String],
  following: [String]
})

// 3. create model of schema
const Post = mongoose.model("Post", userSchema);

// 4. create CRUD functions on model
//CREATE a user
async function register(username, password) {
  const post = await getUser(username);
  console.log(post)
  if(post) throw Error('Username already in use');

  const newPost = await Post.create({
    username: username,
    password: hashed
  });

  return newPost._doc;
}

// READ a user
async function login(username, password) {
  const post = await getUser(username);
  if(!post) throw Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) throw Error('Wrong Password');

  return post._doc;
}

// UPDATE
async function updatePassword(id, password) {
  const post = await Post.updateOne({"_id": id}, {$set: { password: password}});
  return post;
}

//DELETE
async function deletePost(id) {
  await Post.deleteOne({"_id": id});
};

// utility functions
async function getPost(username) {
  return await Post.findOne({ "username": username});
}

// 5. export all functions we want to access in route files
module.exports = { 
  register, login, updatePassword, deletePost
};