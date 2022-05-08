import { Request, Response, NextFunction } from 'express';
import { Campaign, Donor } from '../../../database/models';
import { CustomedError } from '../../../utils';
import { paramsSchema } from '../../../utils/validation';

const getDonorsByCampaignId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = 1,
    }: any = req.query;

    const { id } = await paramsSchema.validateAsync(req.params);
    const donors = await Campaign.findByPk(id, {
      offset: (page - 1) * 6,
      limit: 1,
      include: {
        model: Donor,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      },
    });
    if (!donors) throw new CustomedError('Campaign does not exist', 400);
    res.json({ message: 'Success', data: donors });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomedError(error.details[0].message, 400));
    next(error);
  }
};

export default getDonorsByCampaignId;
