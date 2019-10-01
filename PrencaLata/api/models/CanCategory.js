/**
 * CanCategory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    trademark:{
      type:"string",
      required:true
    },
    size:{
      type:"string",
      required:true
    }

  },

};

