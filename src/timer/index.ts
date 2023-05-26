import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

class DruidTimer {
    private static GPRS_TIME_TABLE_MAX_LIMIT = 4

    private timezone: number = 0

    /**
     * 设置全局时区
     * @param timezone
     */
    public updateTimezone(timezone: number) {
        this.timezone = timezone
    }

    /**
     * utc时间转当前时区的时间
     * @param time
     * @param options
     */
    public utc2LocalTime(
        time: dayjs.ConfigType,
        options?: { timezone?: number; placeholder?: string; format?: string }
    ): string {
        if (!time) {
            return options?.placeholder ? options.placeholder : ''
        }
        const format: string = options?.format ? options.format : 'YYYY-MM-DD HH:mm:ss'
        const timezone: number = options?.timezone ? options.timezone : this.timezone
        return dayjs(time).utc().add(timezone, 'm').format(format)
    }

    /**
     * 整点表转整点数组
     * @param timeStr 000001000000010000001000
     * @returns {Array} [1, 2, 3]
     */
    public timeTable2TimeArr(timeStr: string): string[] {
        let time: string[] = []
        let count = 0
        for (let i = 0; i < 24; i++) {
            if (count === DruidTimer.GPRS_TIME_TABLE_MAX_LIMIT) {
                return time
            }
            if (timeStr[i] === '1') {
                time.push(i + '')
                count++
            }
            if (count === DruidTimer.GPRS_TIME_TABLE_MAX_LIMIT) {
                return time
            }
        }
        return time
    }

    /**
     * 时间数组转时间表
     * @param timeArr
     */
    public timeArr2TimeTable(timeArr: any[]) {
        let str = '000000000000000000000000'
        if (timeArr && timeArr.length > 0) {
            let table = str.split('')
            for (let i = 0; i < DruidTimer.GPRS_TIME_TABLE_MAX_LIMIT; i++) {
                table[timeArr[i]] = '1'
            }
            return table.join('')
        } else {
            return str
        }
    }
}

const drTimer = new DruidTimer()

export default drTimer
