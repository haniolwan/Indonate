import { Router } from 'express';

import authRouter from './authRoutes';
import categoryRouter from './categoryRoutes';
import campaignRouter from './campaignRoutes';
import reportsRouter from './reportsRoutes';
import donationRouter from './donationRoutes';
import adminFamilyRouter from './adminFamilyRoutes';

const router = Router();

router.use(donationRouter);
router.use(authRouter);
router.use(categoryRouter);
router.use(campaignRouter);
router.use(reportsRouter);
router.use('/admin', adminFamilyRouter);

export default router;
