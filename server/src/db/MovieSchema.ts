import Mongoose from "mongoose";
import { Movie } from "../entities/Movie";

interface IMovie extends Movie, Mongoose.Document {}

const Schema = Mongoose.Schema; // 创建一个数据库模型, 类似Mysql的数据表格

// 模型骨架, 类似数据表格中的每一项数据
const MovieSchema = new Schema<IMovie>({
    name: String,
    types: [String],
    areas: [String],
    timing: Number,
    hot: Boolean,
    soon: Boolean,
    classics: Boolean,
    description: String,
    poster: String
}, {
    versionKey: true // 版本控制
});

export default Mongoose.model<IMovie>("Movie", MovieSchema);
