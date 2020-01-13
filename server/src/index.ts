import express from 'express';
import MovieRouter from './routes/MovieRoute';
import UploadRouter from './routes/UploadRoute';

const app = express();

app.use(express.json()); // 配置中间件，用于解析请求消息中的json格式数据

// 电影增删改查
app.use('/api/movie', MovieRouter);

// 图片上传
app.use('/api/upload', UploadRouter);

// 查找图片
app.use('/upload', express.static('public/upload'));

app.listen('3333', () => console.log("服务器连接成功"));
