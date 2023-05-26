class DrRegExp {
    /**
     * 匹配正整数
     */
    public readonly PositiveInteger: RegExp = /^[1-9]d*$/

    /**
     * 匹配负整数
     */
    public readonly NegativeNum: RegExp = /^-[1-9]d*$/

    /**
     * 匹配整数正则
     */
    public readonly Integer: RegExp = /^(-|\+)?\d+$/

    /**
     * 匹配非负浮点数
     */
    public readonly NotNegativeFloatNum: RegExp = /^\d+(\.\d+)?$/

    /**
     * 匹配由 26 个英文字母组成的字符串
     */
    public readonly EnLetter: RegExp = /^[A-Za-z]+$/

    /**
     * 匹配大写英文字母
     */
    public readonly UppercaseLetter: RegExp = /^[A-Z]+$/

    /**
     * 匹配小写英文字母
     */
    public readonly LowercaseLetter: RegExp = /^[a-z]+$/

    /**
     * 匹配电子邮件
     */
    public readonly Email: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    /**
     * 匹配电话号码
     */
    public readonly PhoneNumber: RegExp = /^[0-9+-\s]{3,}$/

    /**
     * 匹配匹配长度在min~max长度的字符串
     * @param val 字字符串
     * @param min 字符串长度限制
     * @param max 最大长度限制
     */
    public stringMaxReg = (val: string, min: number, max: number): boolean => {
        return new RegExp(`^.{${min},${max}}$`).test(val)
    }
}

const drRegExp = new DrRegExp()

export default drRegExp
