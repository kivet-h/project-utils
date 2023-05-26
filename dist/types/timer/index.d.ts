import dayjs from 'dayjs';
declare class DruidTimer {
    private static GPRS_TIME_TABLE_MAX_LIMIT;
    private timezone;
    /**
     * 设置全局时区
     * @param timezone
     */
    updateTimezone(timezone: number): void;
    /**
     * utc时间转当前时区的时间
     * @param time
     * @param options
     */
    utc2LocalTime(time: dayjs.ConfigType, options?: {
        timezone?: number;
        placeholder?: string;
        format?: string;
    }): string;
    /**
     * 整点表转整点数组
     * @param timeStr 000001000000010000001000
     * @returns {Array} [1, 2, 3]
     */
    timeTable2TimeArr(timeStr: string): string[];
    /**
     * 时间数组转时间表
     * @param timeArr
     */
    timeArr2TimeTable(timeArr: any[]): string;
}
declare const drTimer: DruidTimer;
export default drTimer;
