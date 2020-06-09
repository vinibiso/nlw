import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

const generateWebToken = (userInfo: Object) => {
  const token = jwt.sign(userInfo, authConfig.secret, {
    expiresIn: 86400,
  });

  return token;
};

export default generateWebToken;
