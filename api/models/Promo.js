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
    imageUri:{
      type:'string',
      required:true
    },
    admin:{
      model:'admin',
      required:true
    },
    description:{
      type:'string',
      required:true
    },
    canCategory:{
      collection:'canCategory',
      via:'promo',
      through:'promoCategory'
    }
  },
  // async afterCreate(valuesToSet,proceed) {
  // let users = await User.find()
  // users.map(async user=>{
  //   let notification = await Notification.create({description:`Uma nova promoção foi criada`,iconUri:valuesToSet.imageUri,user:user.id,promo:valuesToSet.id}).fetch()
  // })
  // return proceed()
}
};


