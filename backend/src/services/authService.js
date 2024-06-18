const jwt = require("jsonwebtoken");
const fs = require("fs");
const { dirname } = require("./../../dirname");

const privateKeyPath = `${dirname}/config/private.key`;
const publicKeyPath = `${dirname}/config/public.key`;
const privateKey = fs.readFileSync(privateKeyPath);
const publicKey = fs.readFileSync(publicKeyPath);

module.exports = class AuthService {
  generateToken = (payload) => {
    const options = { expiresIn: "12h", algorithm: "RS256" };
    const token = jwt.sign(payload, privateKey, options);
    return token;
  };

  verifyToken = (token) => {
    try {
      let payload = jwt.verify(token, publicKey);
      return payload;
    } catch (error) {
      return null;
    }
  };

}