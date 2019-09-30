/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
const JwtService = require('../services/JwtService');

module.exports = {
    'login':async function(req, res) {
        let {user,password}=req.body
        let result = await User.findOne({id:user})
        sails.log('user',result)
        //Compare the password
        let isEqual = await bcrypt.compare(req.body.password, result.password);
        if (isEqual) {
            return res.status(201).json({user: user, token: JwtService.sign({id: result.id})})
        }else{
            return res.json({msg:'não é igual'})
        }
    }
};

