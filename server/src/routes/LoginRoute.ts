import express from 'express';
import { ResponseHelper } from './ResponseHelper';
import { LoginService } from '../services/LoginService';

const router = express.Router();

router.post('/', async (req, res) => {
    const value = req.body;
    try {
        const data = await LoginService.verifyAccount(value);
        if(typeof data === "string"){
            ResponseHelper.sendError(data, res);
        } else {
            ResponseHelper.sendData(data, res);
        }
    } catch {
        ResponseHelper.sendData(null, res);
    }
});

export default router;
