import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export abstract class BaseEnitity {
    /**
     * 验证当前对象数据
     * @param skip 跳过未定义的属性
     */
    public async validateThis(skip = false): Promise<string[]> {
        const error = await validate(this, {
            skipUndefinedProperties: skip
        });
        const temp: string[] = [];
        if (error.length > 0) {
            error.map(it => Object.values(it.constraints)).forEach(it => temp.push(...it));
        }
        return temp;
    }

    /**
     * 将平面对象转换成Movie类
     * @param plainObj 平面对象
     */
    public static baseTransform<T>(cls: new (...agrs: any[]) => T, plainObj: object): T {
        if (plainObj instanceof cls) {
            return plainObj;
        }
        return plainToClass(cls, plainObj);
    }
}
