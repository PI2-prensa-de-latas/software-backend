/**
 * SmashedCanController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let moment = require('moment')
let momentTz = require('moment-timezone');

module.exports = {
  dataByRasp: async function (req, res) {
    let {idMachine} = req.body;
    let machine = await Machine.findOne({id:idMachine})
    let user = machine.connectUser
    sails.log('user',user)
    let smashedCan = await SmashedCan.create({user:user,machine:machine.id,category:1}).fetch()
    return res.json(smashedCan)     
}

};

// real time
// data de final de promo
// 


