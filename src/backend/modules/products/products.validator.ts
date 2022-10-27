import { Joi, Segments, celebrate } from 'celebrate';

export class ProductsValidator {
  getOne = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      code: Joi.number().required(),
    }),
  });

  updateOne = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      code: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().required().not().empty(),
    }),
  });
}
