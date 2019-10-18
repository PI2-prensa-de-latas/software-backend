const JwtService = require('../services/JwtService');

module.exports = function(req, res, next) {
  let token;

  if(req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if(parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if(/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(401).json({err: 'Formato de header inválido'});
    }
  } else {
    return res.status(401).json({err: 'Faltando header de Authorization'});
  }
  JwtService.verify(token, function(err, decoded) {
    if(err) {
      return res.status(401).json({err: 'Token inválido'})
    }
    req.user = decoded;
    next();
  })
};