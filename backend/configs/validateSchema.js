const { validationResult } = require("express-validator");

const validateSchema = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log( result['errors'][0]['msg'])
    return res.status(400).json({success:false  ,message : result['errors'][0]['msg'] });
  }
  next();
};

module.exports={validateSchema}