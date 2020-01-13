import express from 'express';
import multer from 'multer';
import path from 'path';
import { ResponseHelper } from './ResponseHelper';

const router = express.Router();

const storage = multer.diskStorage({
  // 重定义文件存放路径以及文件名
  destination: path.resolve(__dirname, '../../public/upload'),
  filename(req, file, cb) {
    // 文件名为时间戳加后缀名
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    // 判断文件格式
    const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
    const ext = path.extname(file.originalname);
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('文件类型错误'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 // 文件大小
  }
}).single('imgfile');

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // 发生错误
      ResponseHelper.sendError(err.message, res);
    } else {
      const url = `/upload/${req.file.filename}`;
      ResponseHelper.sendData(url, res);
    }
  });
});

export default router;
