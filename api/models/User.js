/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      required:true,
      unique:true,
    },
    password:{
      type:"string",
      required:true
    },
    profile_pic_uri:{
      type:"string",
    },
    redefinitionCode:{
      type:"string",
    },
    lastLocation:{
      type:"string"
    },
    notification:{
      via:'user',
      collection:'notification'
    }
  },
  beforeCreate(values, cb) {
    bcrypt.hash(values.password, 10, (err, hash) => {
      if (err) return cb(err);
      values.password = hash;
      return cb();
    });
  },
};

