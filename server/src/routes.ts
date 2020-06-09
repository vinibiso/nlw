import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import UsersController from './controllers/UsersController';

const routes = express.Router();
const upload = multer(multerConfig);

// Controllers
const pointsController = new PointsController();
const itemsController = new ItemsController();
const usersController = new UsersController();

// Items
routes.get('/items', itemsController.index);

// Points
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    }),
  }, {
    abortEarly: false,
  }),
  pointsController.create,
);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// Auth
routes.post('/register', usersController.create);
routes.post('/authenticate', usersController.authenticate);

export default routes;
