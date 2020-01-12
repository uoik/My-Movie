import Mongoose from "mongoose";
import MovieModel from "./MovieSchema";

Mongoose.connect("mongodb://localhost:27017/moviedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = Mongoose.connection;
db.on("error", () => console.log("连接失败"));
db.once("open", () => console.log("连接成功"));
db.once("close", () => console.log("数据库已断开链接"));

export { MovieModel };
