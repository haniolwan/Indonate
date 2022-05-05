import { Response, NextFunction } from 'express';
import { verifyToken, customError } from '../../utils';

const authUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { ACCESS_TOKEN } = req.cookies;
    const userToken = await verifyToken(ACCESS_TOKEN);
    const user: object = userToken as object;
    req.user = user;
    next();
  } catch (e) {
    next(new customError('Unauthorized user', 401));
  }
};

export default authUser;
