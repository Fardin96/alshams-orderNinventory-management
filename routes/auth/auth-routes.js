const router = require('express').Router();
const bcrypt = require('bcrypt');

const { jwt_token } = require('../functions/sercurityFunctions');

const User = require('../models/user.model');

//* login route
router.route('/login').post(async (req, res) => {
  try {
    const { name, password } = req.body;

    // console.log('getting the request: ', name, password);

    const userExists = await User.findOne({ name: name });

    // console.log('does the user exist?', userExists);

    if (!userExists) {
      console.log('wrong credentials');
      return res.status(401).json('Please enter correct name and password');
    }

    const correctPassword = await bcrypt.compare(password, userExists.password);
    if (!correctPassword) {
      return res.status(401).json('Please enter correct name and password');
    }

    const token = jwt_token(userExists._id);

    res.send({ token: token });
  } catch (error) {
    console.log('Error logging in: ', error);
    res.status(500).send('Error logging in!');
  }
});

module.exports = router;
