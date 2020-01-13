import express from 'express';
import { ResponseHelper } from './ResponseHelper';
import { MovieService } from '../services/MovieService';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const data = await MovieService.findById(req.params.id);
        ResponseHelper.sendData(data, res);
    } catch {
        ResponseHelper.sendData(null, res);
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await MovieService.find(req.query);
        ResponseHelper.sendPageData(data, res);
    } catch {
        ResponseHelper.sendError('查询条件错误', res);
    }
});

router.post('/', async (req, res) => {
    const data = await MovieService.add(req.body);
    if (Array.isArray(data)) {
        ResponseHelper.sendError(data, res);
    } else {
        ResponseHelper.sendData(data, res);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await MovieService.updata(req.params.id, req.body);
        if (result.length > 0) {
            ResponseHelper.sendError(result, res);
        } else {
            ResponseHelper.sendData(true, res);
        }
    } catch {
        ResponseHelper.sendError('ID错误', res);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await MovieService.remove(req.params.id);
        ResponseHelper.sendData(true, res);
    } catch {
        ResponseHelper.sendError('ID错误', res);
    }
});

export default router;
