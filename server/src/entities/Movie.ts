import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max, IsArray } from "class-validator";
import "reflect-metadata";
import { Type } from "class-transformer";

// 开发电影实体类
export class Movie {
    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(() => String)
    public name: string;

    @IsNotEmpty({ message: "电影类型不能为空" })
    @ArrayMinSize(1, { message: "电影类型不能为空" })
    @IsArray({ message: "电影类型必须是数组" })
    @Type(() => String)
    public types: string[];

    @IsNotEmpty({ message: "上映地区不能为空" })
    @ArrayMinSize(1, { message: "上映地区不能为空" })
    @IsArray({ message: "上映地区必须是数组" })
    @Type(() => String)
    public areas: string[];

    @IsNotEmpty({ message: "影片时长不能为空" })
    @IsInt({ message: "影片时长需为整数" })
    @Min(1, { message: "影片时长最短为一分钟" })
    @Max(3600, { message: "影片时长过长" })
    @Type(() => Number)
    public timing: number;

    @IsNotEmpty({ message: "是否热映不能为空" })
    @Type(() => Boolean)
    public hot: boolean = false; // 是否正在热映

    @IsNotEmpty({ message: "是否即将上映不能为空" })
    @Type(() => Boolean)
    public soon: boolean = false; // 即将上映

    @IsNotEmpty({ message: "是否为经典影片不能为空" })
    @Type(() => Boolean)
    public classics: boolean = false; // 经典影片

    public description?: string; // 影片简介

    public poster?: string; // 影片海报图片
}
