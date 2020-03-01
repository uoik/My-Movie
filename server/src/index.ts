import express from 'express';
import MovieRouter from './routes/MovieRoute';
import UploadRouter from './routes/UploadRoute';
import LoginRouter from './routes/LoginRoute';
import history from 'connect-history-api-fallback';

const app = express();

app.use(express.json()); // 配置中间件，用于解析请求消息中的json格式数据

// 电影增删改查
app.use('/api/movie', MovieRouter);

// 账号验证
app.use('/api/login', LoginRouter);

// 图片上传
app.use('/api/upload', UploadRouter);

// 中间件，用于通过指定的索引页代理请求
app.use(history());

// 页面
app.use('/', express.static('public/build'));

// 查找图片
app.use('/upload', express.static('public/upload'));

app.listen('3333', () => console.log("服务器连接成功"));
