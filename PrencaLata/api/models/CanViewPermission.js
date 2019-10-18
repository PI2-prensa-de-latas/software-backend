/**
 * CanViewPermission.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    admin:{
      model:'admin',
      required:true
    },
    canCategory:{
      model:'canCategory',
      required:true
    }
  },

};

