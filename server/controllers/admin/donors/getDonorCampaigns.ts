import { NextFunction, Request, Response } from 'express';
import { Campaign, Donor } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const getDonorCampaigns = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const campagins = await Donor.findByPk(id, {
      include: {
        model: Campaign,
        attributes: ['title'],
        through: {
          attributes: [],
        },
      },
      attributes: [],
    });
    if (!campagins) throw new CustomError('There is no donor', 400);

    res.json({ message: 'Success', data: { campagins } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    next(error);
  }
};

export default getDonorCampaigns;
