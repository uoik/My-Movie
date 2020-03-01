import { IMovie } from "../db/MovieSchema";
import { Movie } from "../entities/Movie";
import { MovieModel } from '../db';
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";
import { BaseEnitity } from "../entities/BaseEnitity";

export class MovieService {
    /**
     * 插入数据
     * @param movie movie对象
     */
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 转化类型
        movie = Movie.transform(movie);
        // 验证数据
        const error = await movie.validateThis();
        if (error.length > 0) {
            return error;
        }
        // 插入数据库
        return await MovieModel.create(movie);
    }

    /**
     * 根据ID修改一个数据
     * @param id ID
     * @param movie 修改内容
     */
    public static async updata(id: string, movie: Movie): Promise<string[]> {
        // 转化类型
        movie = Movie.transform(movie);
        // 验证数据
        const error = await movie.validateThis(true);
        if (error.length > 0) {
            return error;
        }
        // 修改数据
        await MovieModel.updateOne({ _id: id }, movie);
        return error;
    }

    /**
     * 根据ID删除数据
     * @param id id
     */
    public static async remove(id: string): Promise<void> {
        await MovieModel.deleteOne({ _id: id });
    }

    /**
     * 根据ID查找一个数据
     * @param id id
     */
    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id);
    }

    /**
     * 根据条件查找数据
     * @param condition 条件
     */
    public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
        // 转化类型
        condition = SearchCondition.transform(condition);
        // 验证数据
        const error = await condition.validateThis();
        if (error.length > 0) {
            return {
                total: 0,
                datas: [],
                error
            };
        }
        // 查找数据
        const result = await MovieModel
            .find({ name: { $regex: new RegExp(condition.key) } })
            .skip((condition.page - 1) * condition.limit)
            .limit(condition.limit);
        // 查询总数据
        const total = await MovieModel
            .find({ name: { $regex: new RegExp(condition.key) } })
            .countDocuments();
        return {
            total,
            datas: result,
            error: []
        };
    }
}
