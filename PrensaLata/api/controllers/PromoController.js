/**
 * PromoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment')
let momentTz = require('moment-timezone');
let services = require('../services/promoServices')
module.exports = {

promoTime: async function (req, res) {
    let user = req.body.user
    let finalPromo =[]
    let score = ''
    let finishTime = ""
    let nowTimeStamp = moment().unix() // dia de hoje
    let nowFormated = moment.unix(nowTimeStamp).utc()
    sails.log('now',nowFormated) 
    let promos = await Promo.find()
    sails.log('haha',promos)
    promos.map(async promo =>{
      sails.log('promo',promo.id)
          services.getUserScore(promo.id,user).then(res => sails.log('resposta dentro',res)).catch(e=>sails.log(e))
            // let {createdAt,updatedAt,id,init_date,end_date,name,imageUri,description,admin} = promo
            // // quando vai terminar a promoção
            // let end =moment.unix(end_date).utc();
            // sails.log('end',end)
            // let formatTime = end.diff(nowFormated,"days")
            // sails.log('duration',formatTime)
            // if (formatTime>=0){
            //   formatTime = formatTime
            //     let formatPromo = {createdAt,updatedAt,id,init_date,end_date,name,imageUri,description,admin,formatTime,"score":score}
            //     finalPromo.push(formatPromo)
            // }
    })
    // return res.json(finalPromo)
}
};

