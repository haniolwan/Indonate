import { Router } from 'express';
import { addDonation } from '../controllers';
import authUser from '../middlewares/auth/user';

const donationRouter = Router();

donationRouter.post('/donation/:campaignId', authUser, addDonation);

export default donationRouter;
