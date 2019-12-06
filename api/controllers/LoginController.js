const bcrypt = require('bcrypt');
const JwtService = require('../services/JwtService');

module.exports = {
  // função customizada para realizar o login
   login: async function (req, res) {
    // Se faltar algo essencial para a função, um erro é lançado
    if (!req.body.email || !req.body.password) {
      return res.status(401).json({err: 'Email ou senha faltando'})
    }
    if (req.body.email !== undefined ) {
      // Buscando a pessoa pelo email e carregando junto um ARRAY de auth
        let user = await User.findOne({where: {email: req.body.email}})        
        let admin = await Admin.findOne({where: {email: req.body.email}})
        sails.log('user',user)
        sails.log('admin',admin)
        if(user!==undefined){
          let isEqual = await bcrypt.compare(req.body.password, user.password);
          if (isEqual) {
              return res.status(201).json({user: user, token: JwtService.sign({id: user.id})})
          } else {
              return res.status(401).json({err: 'Email ou senha incorretos'})
          }
        }else{
          let isEqual = await bcrypt.compare(req.body.password, admin.password);
          if (isEqual) {
              return res.status(201).json({user: admin, token: JwtService.sign({id: admin.id})})
          } else {
              return res.status(401).json({err: 'Email ou senha incorretos'})
          }
        }

    }
  },
};