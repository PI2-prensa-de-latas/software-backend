/**
 * PromoMachine.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    machine:{
      model:'machine',
      required:true
    },
    promo:{
      model:'promo',
      required:true
    } 

  },

};

