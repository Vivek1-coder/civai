const express = require("express");
const router = express.Router();
const { validateSchema } = require("../configs/validateSchema.js");
const { wrapAsync } = require("../configs/wrapAsync.js");
const { body } = require("express-validator");
const { registerUserLogic,LoginUserLogic } = require("../Controllers/UserController.js");

//Endpoint to register
router.post(
  "/signup",
  [
    body("username", "Your Username must be atleast 4 character long")
      .isString()
      .isLength({ min: 4 }),
    body("email", "Please enter a valid Email").isEmail(),
    body(
      "password",
      "Password must be atleast 8 character long and must consist of a-z and 0-9"
    )
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ],
  validateSchema,
  wrapAsync(registerUserLogic)
);

// endpoint for login
router.post(
  "/login",
  [
    body("email", "Please enter a valid Email").isEmail(),
    body(
      "password",
      "Password must be atleast 8 character long and must consist of a-z and 0-9"
    )
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ],
  validateSchema,
 wrapAsync(LoginUserLogic)
);



module.exports = router;
