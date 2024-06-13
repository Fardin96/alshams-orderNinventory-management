const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const passwordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.log('Error hashing password: ', err);
  }
};

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

// console.log('+----------FUNCTIONS------------------+');
// console.log('JWT_PRIVATE_KEY: ', JWT_PRIVATE_KEY);
// console.log('+-------------------------------------+');

const jwt_token = (userId) => {
  return jwt.sign({ user: userId }, JWT_PRIVATE_KEY);
};

module.exports = { passwordHash: passwordHash, jwt_token: jwt_token };
