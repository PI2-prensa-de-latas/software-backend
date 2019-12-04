/**
 * Machine.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    alias:{
      type:"string",
      required:true
    },
    admin:{
      model:'admin',
      required:true
    },
    location:{
      type:'string',
      // required:true
    },
    connectUser:{
      type:"number",
    }
  },

};

