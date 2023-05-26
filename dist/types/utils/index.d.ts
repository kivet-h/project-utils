declare class DruidUtils {
    /**
     * 获取字符串字节长度, UTF-8 1个汉字3个字节
     * @param str 数据
     * @param replaceVal 字节长度，一个汉字对应n个字节
     */
    getByteSize(str: string, replaceVal?: string): number;
    /**
     * 转千分位
     * @param number
     */
    toLocalString(number: number): string;
}
declare const drUtils: DruidUtils;
export default drUtils;
