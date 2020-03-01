import Mongoose from "mongoose";

export interface IAccount {
    phone: string;
    password: string;
}

interface IAccounts extends IAccount, Mongoose.Document {}

const Schema = Mongoose.Schema; // 创建一个数据库集合, 类似Mysql的数据表格

// 模型骨架, 类似数据表格中的每一项数据
const LoginSchema = new Schema<IAccounts>({
    phone: String,
    password: String
}, {
    versionKey: false // 版本控制
});

export default Mongoose.model<IAccounts>("Login", LoginSchema);
