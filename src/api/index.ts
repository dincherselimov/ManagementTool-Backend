import { Router } from 'express';
import * as itemController from './/controllers/ItemsController';
import { register } from 'ts-node';
import { userLogin, userRegister } from './controllers/UserController';

const itemRoutes = Router();

itemRoutes.get('/getItems', itemController.getItems);
itemRoutes.post('/addItem', itemController.addItem);
itemRoutes.put('/updateItem/:id', itemController.updateItem);
itemRoutes.delete('/deleteItem/:id', itemController.deleteItem);
itemRoutes.post('/register', userRegister);
itemRoutes.post('/login', userLogin);


export default itemRoutes;

