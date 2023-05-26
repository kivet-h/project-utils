import { ParsedQuery } from 'query-string';
declare class DrUrlParam {
    /**
     * 清除属性为空的字段
     * @param obj
     */
    private static cleanNullProperty;
    /**
     * 获取url参数
     * @param variable
     * @returns {*}
     */
    getParam(variable: string): string | undefined;
    /**
     * 获取url中的参数
     * @returns {params: any}
     */
    getAllParams(): ParsedQuery;
    /**
     * 设置url参数
     * @param {any} params
     */
    setUrlParams: (params: any) => string;
    /**
     * 向url中添加多个数据，如果有重复的就替换
     * @param params
     * @param options
     */
    addUrlParams(params: any, options?: {
        url: string;
        reload: boolean;
    }): string;
    /**
     * 删除url中关于page的参数
     * @param {Array} params? 删除指定字段
     */
    deleteUrlParams(params: any): void;
}
declare const drUrlParam: DrUrlParam;
export default drUrlParam;
