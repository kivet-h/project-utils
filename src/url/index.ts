import queryString, { ParsedQuery } from 'query-string'

class DrUrlParam {
    /**
     * 清除属性为空的字段
     * @param obj
     */
    private static cleanNullProperty(obj: any) {
        for (const propName in obj) {
            if (!obj[propName]) {
                delete obj[propName]
            }
        }
    }

    /**
     * 获取url参数
     * @param variable
     * @returns {*}
     */
    public getParam(variable: string) {
        const querySearch = window.location.hash.split('?')

        if (querySearch.length > 1) {
            const query = querySearch[1]
            const vars = query.split('&')
            for (let i = 0; i < vars.length; i++) {
                const pair = vars[i].split('=')
                if (`${pair[0]}` === `${variable}`) {
                    // 解码
                    return decodeURI(pair[1])
                }
            }
        } else {
            return ''
        }
    }

    /**
     * 获取url中的参数
     * @returns {params: any}
     */
    public getAllParams(): ParsedQuery {
        const search =
            window.location.href.split('?').length > 1 ? window.location.href.split('?')[1] : ''
        return queryString.parse(search)
    }

    /**
     * 设置url参数
     * @param {any} params
     */
    public setUrlParams = (params: any): string => {
        let url = ''
        if (window.location.href.split('?').length > 1) {
            const origin = window.location.href.split('?')[0]
            url = `${origin}?${queryString.stringify(params)}`
        } else {
            url = `${window.location.href}?${queryString.stringify(params)}`
        }
        window.location.href = url

        return url
    }

    /**
     * 向url中添加多个数据，如果有重复的就替换
     * @param params
     * @param options
     */
    addUrlParams(params: any, options?: { url: string; reload: boolean }): string {
        // 删除空数据
        DrUrlParam.cleanNullProperty(params)

        const href = options && options.url ? options.url : window.location.href
        let locationHref = ''

        // 如果有参数，重新组织参数
        if (href.split('?').length > 1) {
            const origin = href.split('?')[0]
            const search = href.split('?')[1]

            let searchParams = queryString.parse(search)
            searchParams = {
                ...searchParams,
                ...params,
            }

            locationHref = `${origin}?${queryString.stringify(searchParams)}`
        }
        // 如果url中没有search，直接赋值
        else {
            locationHref = `${href}?${queryString.stringify(params)}`
        }

        if (options?.reload) {
            window.location.href = locationHref
        }

        return locationHref
    }

    /**
     * 删除url中关于page的参数
     * @param {Array} params? 删除指定字段
     */
    public deleteUrlParams(params: any): void {
        if (window.location.href.split('?').length > 1) {
            let search: string | any = window.location.href.split('?')[1]
            search = queryString.parse(search)

            // 只删除指定字段
            if (params && params.length) {
                params.forEach((param: string) => {
                    delete search[param]
                })

                const paramsStr = queryString.stringify(search)

                window.location.href = `${window.location.href.split('?')[0]}${
                    paramsStr ? `?${paramsStr}` : ''
                }`
            }
            // 不传参数就删除全部字段
            else {
                window.location.href = `${window.location.href.split('?')[0]}`
            }
        }
    }
}

const drUrlParam = new DrUrlParam()

export default drUrlParam
