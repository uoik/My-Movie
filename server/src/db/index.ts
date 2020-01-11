import Mongoose from "mongoose";
import MovieSchema from "./MovieSchema";

Mongoose.connect("mongodb://localhost:27017/moviedb", {
    useNewUrlParser: true
}).then(() => console.log("已连接数据库"));

export { MovieSchema };
