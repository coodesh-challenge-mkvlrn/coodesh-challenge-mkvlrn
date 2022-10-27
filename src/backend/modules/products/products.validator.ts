import { Joi, Segments, celebrate } from 'celebrate';

export class ProductsValidator {
  getOne = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      code: Joi.number().required(),
    }),
  });
}
