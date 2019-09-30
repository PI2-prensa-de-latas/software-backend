/**
 * Promo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    init_date:{
      type:'string',
      required:true
    },
    end_date:{
      type:"string",
      required:true
    },
    name:{
      type:'string',
      required:true
    },
    imageUrl:{
      type:'string',
      required:true
    },
    // owner:{

    // }
  }
};

