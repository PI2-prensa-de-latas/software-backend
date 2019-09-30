/**
 * PromoCategory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    idPromo:{
      model:'promo',
      required:true
    },
    // canCategoryId:{
    //   model:'canCategory',
    //   required:true
    // }
  },

};

