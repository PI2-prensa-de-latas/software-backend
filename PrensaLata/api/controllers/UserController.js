/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'igotaraujo97@gmail.com',
    pass: '95592007i'
  }
});

module.exports = {
 redefinitionCode: async function (req, res) {
    try {
      const email = req.body.email;
      const user = await User.findOne({email: email});
      sails.log('user',user)
      const token = uuidv1();
      sails.log(token)
      const updateCode = await User.updateOne({id: user.id}).set({redefinitionCode: token});
      sails.log('UPDATE',updateCode)
        var mailOptions = {
          from: 'igotaraujo97@gmail.com',
          to: user.email,
          subject: 'Redefinir senha',
          text: `linkdofront/${updateCode.redefinitionCode}`
        };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        }); 
      //enviar email com link para acessar com o código de redefiniçãos
      return res.status(200).json({msg:`${user.name} para redefinir sua senha basta entrar no email ${user.email} e redefinir a senha   `})
    } catch (e) {
      return res.status(400).json(e)
    }

  },
  changePassword: async function (req, res) {
    try {
      // Body da requisição
      const redefinitionCode = req.body.redefinitionCode;
      const newPassword = req.body.password;
      const newPasswordConfirmation = req.body.newPasswordConfirmation;
      // validação se o redefinitionCode é válido no app
      if(redefinitionCode!==undefined && newPassword !== undefined && newPasswordConfirmation !== undefined){
        try {
          let user = await User.findOne({redefinitionCode:redefinitionCode})
          console.log('user',user)
          bcrypt.hash(newPassword, 10, async(err, hash) => {
            if (err) {
              console.error(err)
            }
            let updatePassword = await User.updateOne({id: user.id}).set({password: hash}); 
            })          
          return res.status(200).json({success:"senha redefinida com sucesso"})
        } catch (e) {
          return res.status(400).json({error:'redefitionCode inválido'})
        }
      }
      else{
        return res.status(400).json({error: 'Algum dos valores não foi passado corretamente'})
      }
    } catch (e) {
      return res.status(400).json(e)
    }
  },

  getScore: async function(req,res){
    let userId = req.body.user
    if(userId === undefined){
      res.json({err:"User não está definido"})      
    }
    let user = await SmashedCan.find({user:userId})
    let numberOfCan = user.length;
    return res.json({Score:numberOfCan})
  },
  getUserScore: async function (req, res) {
    // req.body should contain .promo and .user
    
    // Get Promo requirements
    let promo = await Promo.findOne({id: req.body.promo});
    let categories = await PromoCategory.find({promo: req.body.promo});
    let categoriesId = categories.map((value => value.id));
    
    let machines = await PromoMachine.find({promo: req.body.promo});
    let machinesId = machines.map((value => value.id));
    sails.log('mashinesId',machinesId)

    // Get Cans that fit in promotion requirements
    let cans = await SmashedCan.find({
      user: req.body.user,
      createdAt: {'>': parseInt(promo.init_date)},
      createdAt: {'<': parseInt(promo.end_date)},
      canCategory: {in: categoriesId},
      machine: {in: machinesId},
    })

    return res.json({
      score: cans.length,
    })
  }


};

