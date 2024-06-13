const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { passwordHash, jwt_token } = require('../../utils/auth-utils');
const User = require('../../models/user.model');

//* registration route
router.route('/register').post(async (req, res) => {
  const email = req.body.email;
  const password = await passwordHash(req.body.password);

  // console.log('this req is hitting: ', name, password);

  try {
    const emailExists = await User.findOne({ email });

    // check duplicate user
    if (!emailExists) {
      const newUser = new User({
        email,
        password,
      });

      // console.log('sending to server: ', newUser);

      const token = jwt_token(newUser._id);

      await newUser
        .save()
        .then(() => res.json({ token: token }))
        .catch((error) =>
          res.status(401).json('error adding new user: ', error.message)
        );
    } else {
      res.status(401).json('duplicate user!');
    }
  } catch (error) {
    console.log('error registering user!', error);
  }
});

//* login route
router.route('/login').post(async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log('getting the request: ', name, password);

    const userExists = await User.findOne({ email: email });

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
