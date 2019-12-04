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
  },

  create: async function (req, res) {
    let actualMachine = parseInt(req.body.machine);
    let machineFetch = await Machine.findOne({id:actualMachine});
    let connectedUser = machineFetch.connectUser;
    let canBody = {
      user: connectedUser,
      machine: req.body.machine,
      canCategory: req.body.canCategory
    }
    SmashedCan.create(canBody)
      .then(response => res.status(200).json(response))
      .catch(error => res.status(400).json(error));
  }

};

// real time
// data de final de promo
// 


