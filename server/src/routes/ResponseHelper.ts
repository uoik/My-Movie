import { ISearchResult } from "../entities/CommonTypes";
import { Response } from "express";

export class ResponseHelper {
    /**
     * 响应一个错误
     * @param error 错误信息
     * @param res 响应体
     */
    public static sendError(error: string | string[], res: Response) {
        let err: string;
        if (Array.isArray(error)) {
            err = error.join(';');
        } else {
            err = error;
        }

        res.send({
            error: err,
            data: null
        });
    }

    /**
     * 响应一个普通数据
     * @param data 数据
     * @param res 响应体
     */
    public static sendData(data: any, res: Response) {
        res.send({
            error: null,
            datas: data
        });
    }

    /**
     * 响应分页数据
     * @param result 分页响应信息
     * @param res 响应体
     */
    public static sendPageData<T>(result: ISearchResult<T>, res: Response) {
        if (result.error.length > 0) {
            this.sendError(result.error, res);
        } else {
            res.send({
                total: result.total,
                datas: result.datas,
                error: []
            });
        }
    }
}
