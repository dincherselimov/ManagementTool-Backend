import { Router } from 'express';
import { userLogin, userRegister } from './controllers/UserController';
import * as TimeReportController from './/controllers/TimeReportController';


const itemRoutes = Router();

itemRoutes.post('/register', userRegister);
itemRoutes.post('/login', userLogin);
itemRoutes.post('/insertData', TimeReportController.insertData);
itemRoutes.get('/getAllReports', TimeReportController.getAllTimeReports);
itemRoutes.get('/getUserTimeReports', TimeReportController.getUserTimeReport);
itemRoutes.delete('/deleteUserTimeReport', TimeReportController.deleteUserTimeReport);

export default itemRoutes;

