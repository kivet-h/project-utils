class DruidUtils {
    /**
     * 获取字符串字节长度, UTF-8 1个汉字3个字节
     * @param str 数据
     * @param replaceVal 字节长度，一个汉字对应n个字节
     */
    public getByteSize(str: string, replaceVal?: string) {
        if (!str) return 0
        const CHINESE_REG = /[^\u0000-\u00ff]/g
        return str.replace(CHINESE_REG, replaceVal ? replaceVal : 'aaa').length
    }

    /**
     * 转千分位
     * @param number
     */
    public toLocalString(number: number) {
        if (!number) {
            return '0'
        }
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}

const drUtils = new DruidUtils()

export default drUtils
