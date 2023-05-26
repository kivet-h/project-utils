import { IProps } from './type';
declare class ProductLiteClass {
    private static instance;
    private static token;
    private static session_key;
    private static language?;
    constructor(props: IProps);
    /**
     * 处理后端返回的产品型号相关数据
     * @param data
     * @returns
     */
    private static _onProcessProductLiteData;
    /**
     * fetch获取产品型号相关数据
     * @desc 后端做了协商缓存的，前端就暂时不做限时请求
     */
    private static fetchProductLiteData;
    /**
     * 获取一次产品型号相关数据
     */
    getProductLiteData: () => void;
    /**
     * 根据传入的设备信息，从处理好的产品型号数据中获取对应的型号数据
     * @param device
     * @returns
     */
    getProductLiteDataByDeviceInfo: (device: any) => any;
    /**
     * 传入设备信息数据，返回设备对应的系列名称
     * @param device
     * @returns
     */
    getSeriesName: (device?: any) => string | undefined;
    /**
     * 清除session中产品型号相关数据
     */
    static clearSessionData: () => void;
}
export default ProductLiteClass;
