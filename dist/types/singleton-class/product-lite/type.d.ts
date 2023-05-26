export interface ILanguage {
    /** 未知型号 */
    unknown_model?: string;
}
export interface IProps {
    /** token */
    token: string;
    /** 存储产品型号数据的 session key */
    session_key?: string;
    /** 语言参数 */
    language?: ILanguage;
}
