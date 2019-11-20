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
    let nowTimeStamp = moment().unix() // dia de hoje
    let nowFormated = moment.unix(nowTimeStamp).utc()
    sails.log('now',nowFormated) 
    let promos = await Promo.find()
    promos.map(promo =>{
            let {createdAt,updatedAt,id,init_date,end_date,name,imageUri,description,admin} = promo
            // quando vai terminar a promoção
            let end =moment.unix(end_date).utc();
            sails.log('end',end)
            let formatTime = end.diff(nowFormated,"days")
            sails.log('duration',formatTime)
            if (formatTime>=0){
              formatTime = formatTime+1
                let formatPromo = {createdAt,updatedAt,id,init_date,end_date,name,imageUri,description,admin,formatTime}
                finalPromo.push(formatPromo)
            }
    })
    return res.json(finalPromo)
}
};

