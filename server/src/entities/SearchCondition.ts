import { Type } from "class-transformer";
import { Min, IsInt } from "class-validator";
import { BaseEnitity } from "./BaseEnitity";

export class SearchCondition extends BaseEnitity {
    /**
     * 页码
     */
    @Type(() => Number)
    @Min(1, {message: '页码不能小于1'})
    @IsInt({message: '页码必须为整数'})
    public page: number = 1;
    /**
     * 页容量
     */
    @Type(() => Number)
    @Min(1, {message: '页容量不能小于1'})
    @IsInt({message: '页容量必须为整数'})
    public limit: number = 10;
    /**
     * 关键字
     */
    @Type(() => String)
    public key: string = '';

    /**
     * 将平面对象转换成Movie类
     * @param plainObj 平面对象
     */
    public static transform(plainObj: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObj);
    }
}
