declare class DrRegExp {
    /**
     * 匹配正整数
     */
    readonly PositiveInteger: RegExp;
    /**
     * 匹配负整数
     */
    readonly NegativeNum: RegExp;
    /**
     * 匹配整数正则
     */
    readonly Integer: RegExp;
    /**
     * 匹配非负浮点数
     */
    readonly NotNegativeFloatNum: RegExp;
    /**
     * 匹配由 26 个英文字母组成的字符串
     */
    readonly EnLetter: RegExp;
    /**
     * 匹配大写英文字母
     */
    readonly UppercaseLetter: RegExp;
    /**
     * 匹配小写英文字母
     */
    readonly LowercaseLetter: RegExp;
    /**
     * 匹配电子邮件
     */
    readonly Email: RegExp;
    /**
     * 匹配电话号码
     */
    readonly PhoneNumber: RegExp;
    /**
     * 匹配匹配长度在min~max长度的字符串
     * @param val 字字符串
     * @param min 字符串长度限制
     * @param max 最大长度限制
     */
    stringMaxReg: (val: string, min: number, max: number) => boolean;
}
declare const drRegExp: DrRegExp;
export default drRegExp;
