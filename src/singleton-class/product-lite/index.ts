/*
 * @Description: 处理产品型号相关数据的 class
 */
import moment from 'moment'
import axios from 'axios'
import { ILanguage, IProps } from './type'

// ? 存储产品型号数据的 session key 默认值
const PRODUCT_LITE_HASH_SESSION_KEY = 'product_lite_data_utils'
// ? 获取产品型号数据的 API
const API_URL = '/api/v2/product/lite'

class ProductLiteClass {
    private static instance: any
    private static token: string
    private static session_key: string = PRODUCT_LITE_HASH_SESSION_KEY
    private static language?: ILanguage = { unknown_model: '未知型号' }

    constructor(props: IProps) {
        if (!ProductLiteClass.instance) {
            ProductLiteClass.instance = this
        }

        console.log('props-', props)

        ProductLiteClass.token = props?.token
        ProductLiteClass.session_key = props?.session_key || PRODUCT_LITE_HASH_SESSION_KEY
        ProductLiteClass.language = props?.language

        return ProductLiteClass.instance
    }

    /**
     * 处理后端返回的产品型号相关数据
     * @param data
     * @returns
     */
    private static _onProcessProductLiteData = (data: any[]) => {
        // console.time('遍历处理数据用时 =====>')
        let processedData = {}
        let originDataToMap = {}

        for (const item of data) {
            const { skus = [], id = '' } = item

            originDataToMap = { ...originDataToMap, [id]: item }

            for (const skuItem of skus) {
                const { device_type, fitting_versions, hardware_versions } = skuItem
                if (Array.isArray(hardware_versions) && hardware_versions.length) {
                    // ? 存在硬件版本
                    for (const hItem of hardware_versions) {
                        if (Array.isArray(fitting_versions) && fitting_versions.length) {
                            // * 存在装配版本
                            for (const fItem of fitting_versions) {
                                processedData = {
                                    ...processedData,
                                    [`${device_type}-${hItem}-${fItem}`]: id,
                                }
                            }
                        } else {
                            // * 无装配版本
                            processedData = {
                                ...processedData,
                                [`${device_type}-${hItem}-*`]: id,
                            }
                        }
                    }
                } else {
                    // ? 无硬件版本
                    if (Array.isArray(fitting_versions) && fitting_versions.length) {
                        // * 存在装配版本
                        for (const fItem of fitting_versions) {
                            processedData = {
                                ...processedData,
                                [`${device_type}-*-${fItem}`]: id,
                            }
                        }
                    } else {
                        // * 无装配版本
                        processedData = { ...processedData, [`${device_type}-*-*`]: id }
                    }
                }
            }
        }

        // console.timeEnd('遍历处理数据用时 =====>')

        return { processedData, originDataToMap }
    }

    /**
     * fetch获取产品型号相关数据
     * @desc 后端做了协商缓存的，前端就暂时不做限时请求
     */
    private static fetchProductLiteData = async () => {
        try {
            const res = await axios.get(API_URL, {
                headers: { 'x-druid-authentication': ProductLiteClass.token },
            })

            console.log('== utils 获取产品型号数据 ==', res)

            if (res.data && res.data.length) {
                const data = {
                    // Etag: res.headers?.etag || '',
                    latestUpdate: moment().valueOf(),
                    processData: ProductLiteClass._onProcessProductLiteData(res.data).processedData,
                    originData: ProductLiteClass._onProcessProductLiteData(res.data)
                        .originDataToMap,
                }
                sessionStorage.setItem(ProductLiteClass.session_key, JSON.stringify(data))
            }
        } catch (error) {
            console.log('get product lite data err', error)
        }
    }

    /**
     * 获取一次产品型号相关数据
     */
    public getProductLiteData = () => {
        const sessionData: any = JSON.parse(
            sessionStorage.getItem(ProductLiteClass.session_key) || '{}'
        )

        const latestUpdate = sessionData?.latestUpdate
        if (latestUpdate && moment().diff(moment(latestUpdate), 'm') <= 10) {
            // ? 优化：最后一次请求接口的时间存在，且没有超过10分钟（暂定10分钟），不用再次调接口请求
        } else {
            ProductLiteClass.fetchProductLiteData()
        }
    }

    /**
     * 根据传入的设备信息，从处理好的产品型号数据中获取对应的型号数据
     * @param device
     * @returns
     */
    public getProductLiteDataByDeviceInfo = (device: any) => {
        if (!device) return
        const sessionData: any = JSON.parse(
            sessionStorage.getItem(ProductLiteClass.session_key) || '{}'
        )

        const { device_type, hardware_version = '*', fitting_version = '*' } = device

        const originData = sessionData?.originData

        let productId = ''
        try {
            // ? 通配优先级顺序：（ABC > AB* > A** > A*C）via.后端
            productId =
                sessionData?.processData[`${device_type}-${hardware_version}-${fitting_version}`] ||
                sessionData?.processData[`${device_type}-${hardware_version}-*`] ||
                sessionData?.processData[`${device_type}-*-*`] ||
                sessionData?.processData[`${device_type}-*-${fitting_version}`]
        } catch (e) {
            return undefined
        }

        if (!productId) return undefined

        return originData[productId]
    }

    /**
     * 传入设备信息数据，返回设备对应的系列名称
     * @param device
     * @returns
     */
    public getSeriesName = (device?: any) => {
        if (!device || !Object.keys(device).length) return

        const productLiteData = this.getProductLiteDataByDeviceInfo(device) || {}

        const { series = '', series_child = '' } = productLiteData

        if (series || series_child) {
            return `${series} ${series_child}`
        } else {
            return ProductLiteClass.language?.unknown_model
        }
    }

    /**
     * 清除session中产品型号相关数据
     */
    public static clearSessionData = () => {
        sessionStorage.removeItem(ProductLiteClass.session_key)
    }
}

export default ProductLiteClass
