/**
 * Notification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    description:{
      type:'string',
      required:true
    },
    iconUri:{
      type:'string',
    },
    user:{
      model:'user',
      required:true
    },
    promo:{
      model:'promo',
      required:true
    }
  },

};

