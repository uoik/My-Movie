import { IMovie } from "../db/MovieSchema";
import { Movie } from "../entities/Movie";
import { MovieModel } from '../db';

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
     * 根据ID修改一个对象
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
     * 根据ID查找一个对象
     * @param id id
     */
    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id);
    }
}
