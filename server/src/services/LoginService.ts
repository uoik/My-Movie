import { LoginModel } from '../db';
import { IAccount } from '../db/LoginSchema';

export class LoginService {
    /**
     * 插入数据
     * @param value 账号信息
     */
    public static async add(value: IAccount): Promise<any> {
        let isVal: IAccount | undefined = undefined;
        await this.find().then(resp => {
            isVal = resp.find(i => i.phone === value.phone);
        });
        if (!isVal) {
            // 已经有相同账号了
            return '该账号已被注册';
        } else {
            // 可以注册
            // 插入数据库
            return await LoginModel.create(value);
        }
    }

    /**
     * 查询所有账号
     */
    public static async find(): Promise<IAccount[]> {
        return await LoginModel.find();
    }

    /**
     * 查询账号密码是否正确
     * @param value 账号密码
     */
    public static async verifyAccount(value: IAccount): Promise<IAccount | string> {
        let isVal: any = undefined;
        await this.find().then(resp => {
            isVal = resp.find(i => i.phone === value.phone);
        });
        if (isVal) {
            if (isVal.password === value.password) {
                return isVal;
            } else {
                return '密码错误';
            }
        } else {
            // 已经有相同账号了
            return '账号不存在';
        }
    }
}
