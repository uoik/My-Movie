import express from 'express';
import { ResponseHelper } from './ResponseHelper';
import { MovieService } from '../services/MovieService';

const router = express.Router();

router.get('/:id', async (rep, res) => {
    try {
        const data = await MovieService.findById(rep.params.id);
        ResponseHelper.sendData(data, res);
    } catch {
        ResponseHelper.sendData(null, res);
    }
});

router.get('/', async (rep, res) => {
    try {
        const data = await MovieService.find(rep.query);
        ResponseHelper.sendPageData(data, res);
    } catch {
        ResponseHelper.sendError('查询条件错误', res);
    }
});

router.post('/', async (rep, res) => {
    const data = await MovieService.add(rep.body);
    if (Array.isArray(data)) {
        ResponseHelper.sendError(data, res);
    } else {
        ResponseHelper.sendData(data, res);
    }
});

router.put('/:id', async (rep, res) => {
    try {
        const result = await MovieService.updata(rep.params.id, rep.body);
        if (result.length > 0) {
            ResponseHelper.sendError(result, res);
        } else {
            ResponseHelper.sendData(true, res);
        }
    } catch {
        ResponseHelper.sendError('ID错误', res);
    }
});

router.delete('/:id', async (rep, res) => {
    try {
        await MovieService.remove(rep.params.id);
        ResponseHelper.sendData(true, res);
    } catch {
        ResponseHelper.sendError('ID错误', res);
    }
});

export default router;
