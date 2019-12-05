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

const promoServices = require('./../services/promoServices');

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
    let score;

    try {
      score = await promoServices.getUserScore(req.body.promo, req.body.user);
      console.log(score);
      return res.status(200).json({
        score: score,
      })
    } catch (e) {
      res.status(400).json(e);
    }
  },

  getAllScores: async function (req, res) {
    
    const fetchPromoWithScore = async (promo, userId) => {
      let remaining_time = promoServices.getRemaingTime(promo.end_date);
      if (remaining_time.type !== 'over') {
        let score = await promoServices.getUserScore(promo.id, userId);
        let returnObj = {
          img: promo.imageUri,
          name: promo.name,
          obtained_score: score,
          remaining_time: remaining_time,
          description: promo.description,
        }
        return returnObj;
      }
    }
    
    const buildAllData = (promos, userId) => {
      return Promise.all(promos.map(promo => fetchPromoWithScore(promo, userId)));
    }

    try {
      let userId = req.body.user;
      let promos = await Promo.find();
      let promosWithScore = await buildAllData(promos, userId);
      
      res.status(200).json(promosWithScore);

    } catch (e) {
      res.status(400).json(e);
    }
  }

};

