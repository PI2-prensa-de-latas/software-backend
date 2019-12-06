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
},

newPromo: async function (req, res) {
  let promoBody = {
    name: req.body.name,
    description: req.body.description,
    init_date: req.body.init_date,
    end_date: req.body.end_date,
    imageUri: req.body.imgLink,
    admin: 1,
  }
  let response = await Promo.create(promoBody).fetch();

  for (let i=0; i<req.body.canCategories; i++) {
    await PromoCategory.create({
      promo: response.id,
      canCategory: req.body.canCategories[i],
    })
  }

  for (let i=0; i<req.body.machines; i++) {
    await PromoMachine.create({
      promo: response.id,
      machine: req.body.machines[i],
    })
  }

  return res.status(200).json({
    response
  })
},

getWinner: async function (req, res) {
  // req.body should contain .promo and .user
  // Get Promo requirements
  let promoId = req.body.promo;
  let promo = await Promo.findOne({id: promoId});
  let categories = await PromoCategory.find({promo: promoId});
  let categoriesId = categories.map((value => value.id));
  let machines = await PromoMachine.find({promo: promoId});
  let machinesId = machines.map((value => value.id));

  // Get Cans that fit in promotion requirements
  let cans = await SmashedCan.find({
    createdAt: {'>': parseInt(promo.init_date)},
    createdAt: {'<': parseInt(promo.end_date)},
    canCategory: {in: categoriesId},
    machine: {in: machinesId},
  })

  let luckyNumber = Math.floor(Math.random() * cans.length);
  let winnerId = cans[luckyNumber].user;
  let winner = await User.findOne({id: winnerId});

  return res.status(200).json({winner: winner});
}

};

