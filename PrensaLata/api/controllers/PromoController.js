/**
 * PromoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment')
let momentTz = require('moment-timezone');
module.exports = {

promoTime: async function (req, res) {
    let finalPromo =[]
    let finishTime = ""
    var serverDate = momentTz.tz("america/Sao_Paulo");
    sails.log(serverDate)
    let promos = await Promo.find()
    promos.map(promo =>{
            let {createdAt,updatedAt,id,init_date,end_date,name,imageUri,description,admin} = promo
            let formatTime = moment("20191110", "YYYYMMDD","pt").fromNow(serverDate)
          //   if(formatTime === "um dia"){
          //        finishTime = "Algumas horas"
          //   }else{
          //        finishTime = formatTime
          //   }
          //   let remamining_time =finishTime
            let formatPromo = {createdAt,updatedAt,id,init_date,end_date,name,imageUri,description,admin,formatTime}
            finalPromo.push(formatPromo)

    })
    sails.log(serverDate)
    return res.json(finalPromo)
}
};

