import Mongoose from "mongoose";
import MovieModel from "./MovieSchema";
import LoginModel from './LoginSchema';
import { config } from "./config";

Mongoose.connect(config.movieDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = Mongoose.connection;
db.on("error", () => console.log("连接失败"));
db.once("open", () => console.log("连接成功"));
db.once("close", () => console.log("数据库已断开链接"));

export { MovieModel, LoginModel };
