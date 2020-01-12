import express from 'express';
import router from './routes/MovieRoute';

const app = express();

app.use(express.json()); // 配置中间件，用于解析请求消息中的json格式数据

app.use('/api/movie', router);

app.listen('3333', () => console.log("服务器连接成功"));
